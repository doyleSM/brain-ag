import { GetTotalAreaUseCase } from 'src/application/usecases/dashboard/get-total-area.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { DashboardRepositoryImpl } from '../repository/dashboard.repository';

export const getTotalAreaUseCaseFactory = {
  provide: 'GET_TOTAL_AREA_USE_CASE',
  useFactory: (dashboardRepository: DashboardRepository) => new GetTotalAreaUseCase(dashboardRepository),
  inject: [DashboardRepositoryImpl],
};
