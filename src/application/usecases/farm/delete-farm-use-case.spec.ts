import BaseUseCase from '../base.use-case';
import { DeleteFarmInputDto } from 'src/application/dto/farm/delete-farm.input.dto';
import { NotFoundError } from 'src/domain/errors/not-found.error';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';

export class DeleteFarmUseCase implements BaseUseCase<DeleteFarmInputDto, void> {
  constructor(private uw: UnitOfWork) {}

  async execute(input: DeleteFarmInputDto): Promise<void> {
    try {
      const existingFarm = await this.uw.farmRepository.findById(input.farmId);

      if (!existingFarm) {
        throw new NotFoundError(`Farm with id ${input.farmId} not found`);
      }

      await this.uw.beginTransaction();
      await this.uw.farmRepository.delete(existingFarm);
      await this.uw.farmerRepository.delete(existingFarm.farmer);
      await this.uw.commit();
      return;
    } catch (error) {
      await this.uw.rollback();
      throw error;
    }
  }
}
