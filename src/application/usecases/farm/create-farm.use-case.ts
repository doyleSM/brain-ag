import BaseUseCase from '../base.use-case';
import { CreateFarmInputDto } from 'src/application/dto/farm/create-farm.input.dto';
import { CreateFarmOutputDto } from 'src/application/dto/farm/create-farm.output.dto';
import { Farm } from 'src/domain/entities/farm';
import { Farmer } from 'src/domain/entities/farmer';
import { ConflictError } from 'src/domain/errors/conflict.error';
import { UnprocessableEntityError } from 'src/domain/errors/unprocessable-entity.error';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';

export class CreateFarmUseCase implements BaseUseCase<CreateFarmInputDto, CreateFarmOutputDto> {
  constructor(private uw: UnitOfWork) {}

  async execute(input: CreateFarmInputDto): Promise<CreateFarmOutputDto> {
    try {
      const existingFarmer = await this.uw.farmerRepository.findByCpfCnpj(input.cpfCnpj);

      if (existingFarmer) {
        throw new ConflictError(`Farmer with this CPF/CNPJ ${input.cpfCnpj} already exists`);
      }

      const crops = await this.uw.cropRepository.findByIds(input.crops);
      const notFoundCrops = input.crops?.filter((cropId) => !crops.some((crop) => crop.id === cropId));
      if (notFoundCrops.length) {
        throw new UnprocessableEntityError(notFoundCrops.map((cropId) => `Crop with id ${cropId} not found`));
      }

      const farm = new Farm(
        input.farmName,
        input.city,
        input.state,
        input.totalAreaHectares,
        input.cultivableAreaHectares,
        input.vegetationAreaHectares,
      );

      const farmer = new Farmer(input.cpfCnpj, input.farmerName);
      farm.addCrops(crops);
      farm.farmer = farmer;

      await this.uw.beginTransaction();
      await this.uw.farmerRepository.save(farmer);
      await this.uw.farmRepository.save(farm);
      await this.uw.commit();
      return farm.toJson();
    } catch (error) {
      await this.uw.rollback();
      throw error;
    }
  }
}
