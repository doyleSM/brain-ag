import { ListCropsUseCase } from 'src/application/usecases/crop/list-crops-use-case';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import { UnitOfWorkImpl } from 'src/infra/database/unit-of-work.repository';

export const listCropUseCaseFactory = {
  provide: 'LIST_CROP_USE_CASE',
  useFactory: (uw: UnitOfWork) => new ListCropsUseCase(uw),
  inject: [UnitOfWorkImpl],
};
