import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { DashboardRepositoryImpl } from '../repository/dashboard.repository';
import { GetTotalFarmsByCropUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-crop.use-case';

export const getTotalFarmsByCropUseCaseFactory = {
  provide: 'GET_TOTAL_FARMS_BY_CROP_USE_CASE',
  useFactory: (dashboardRepository: DashboardRepository) => new GetTotalFarmsByCropUseCase(dashboardRepository),
  inject: [DashboardRepositoryImpl],
};
