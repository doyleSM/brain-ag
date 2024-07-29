import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { DashboardRepositoryImpl } from '../repository/dashboard.repository';
import { GetTotalLandUseUseCase } from 'src/application/usecases/dashboard/get-total-land-use.use-case';

export const getTotalLandUseUseCaseFactory = {
  provide: 'GET_TOTAL_LAND_USE_USE_CASE',
  useFactory: (dashboardRepository: DashboardRepository) => new GetTotalLandUseUseCase(dashboardRepository),
  inject: [DashboardRepositoryImpl],
};
