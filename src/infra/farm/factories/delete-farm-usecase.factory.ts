import { DeleteFarmUseCase } from 'src/application/usecases/farm/delete-farm-use-case';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import { UnitOfWorkImpl } from 'src/infra/database/unit-of-work.repository';

export const deleteFarmUseCaseFactory = {
  provide: 'DELETE_FARM_USE_CASE',
  useFactory: (uw: UnitOfWork) => new DeleteFarmUseCase(uw),
  inject: [UnitOfWorkImpl],
};
