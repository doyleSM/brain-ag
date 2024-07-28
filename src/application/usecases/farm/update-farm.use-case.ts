import { ConflictError } from 'src/domain/errors/conflict.error';

import { UnprocessableEntityError } from 'src/domain/errors/unprocessable-entity.error';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import BaseUseCase from '../base.use-case';
import { NotFoundError } from 'src/domain/errors/not-found.error';
import { UpdatFarmInputDto } from 'src/application/dto/farm/update-farm.input.dto';
import { UpdateFarmOutputDto } from 'src/application/dto/farm/update-farm.output.dto';

type Payload = {
  farmId: string;
  input: UpdatFarmInputDto;
};

export class UpdateFarmUseCase implements BaseUseCase<Payload, UpdateFarmOutputDto> {
  constructor(private uw: UnitOfWork) {}

  async execute(payload: Payload): Promise<UpdateFarmOutputDto> {
    try {
      await this.uw.beginTransaction();

      const farm = await this.uw.farmRepository.findById(payload.farmId);
      if (!farm) {
        throw new NotFoundError(`Farm with id ${payload.farmId} not found`);
      }

      if (payload.input?.cpfCnpj) {
        const existingFarmer = await this.uw.farmerRepository.findByCpfCnpj(payload.input?.cpfCnpj);
        if (existingFarmer && existingFarmer.id !== farm.farmer.id) {
          throw new ConflictError(`Farmer with CPF/CNPJ ${payload.input?.cpfCnpj} already exists`);
        }
        farm.farmer.cpfCnpj = payload.input?.cpfCnpj;
      }

      if (payload.input?.farmerName) {
        farm.farmer.name = payload.input?.farmerName;
      }

      if (payload.input?.farmName) {
        farm.name = payload.input?.farmName;
      }

      if (payload.input?.city) {
        farm.city = payload.input?.city;
      }

      if (payload.input?.state) {
        farm.state = payload.input?.state;
      }

      if (payload.input?.cultivableAreaHectares) {
        farm.cultivableAreaHectares = payload.input?.cultivableAreaHectares;
      }

      if (payload.input?.vegetationAreaHectares) {
        farm.vegetationAreaHectares = payload.input?.vegetationAreaHectares;
      }

      if (payload.input?.totalAreaHectares) {
        farm.totalAreaHectares = payload.input?.totalAreaHectares;
      }

      if (payload.input?.crops) {
        const crops = await this.uw.cropRepository.findByIds(payload.input?.crops);
        const notFoundCrops = payload.input?.crops.filter((cropId) => !crops.some((crop) => crop.id === cropId));

        if (notFoundCrops.length) {
          throw new UnprocessableEntityError(notFoundCrops.map((cropId) => `Crop with id ${cropId} not found`));
        }

        const cropsToRemove = farm.crops.filter((crop) => !payload.input?.crops.includes(crop.id));
        const cropsToAdd = crops.filter((crop) => !farm.crops.some((c) => c.id === crop.id));

        farm.removeCrops(cropsToRemove);
        farm.addCrops(cropsToAdd);
      }

      await this.uw.farmRepository.save(farm);
      await this.uw.farmerRepository.save(farm.farmer);
      await this.uw.commit();

      return farm.toJson();
    } catch (error) {
      await this.uw.rollback();
      throw error;
    }
  }
}
