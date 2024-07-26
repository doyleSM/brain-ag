import { CreateFarmUseCase } from 'src/application/usecases/farm/create-farm.use-case';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import { UnitOfWorkImpl } from 'src/infra/database/unit-of-work.repository';

export const createFarmUseCaseFactory = {
  provide: 'CREATE_FARM_USE_CASE',
  useFactory: (uw: UnitOfWork) => new CreateFarmUseCase(uw),
  inject: [UnitOfWorkImpl],
};
