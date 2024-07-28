import { UpdateFarmUseCase } from 'src/application/usecases/farm/update-farm.use-case';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import { UnitOfWorkImpl } from 'src/infra/database/unit-of-work.repository';

export const updateFarmUseCaseFactory = {
  provide: 'UPDATE_FARM_USE_CASE',
  useFactory: (uw: UnitOfWork) => new UpdateFarmUseCase(uw),
  inject: [UnitOfWorkImpl],
};
