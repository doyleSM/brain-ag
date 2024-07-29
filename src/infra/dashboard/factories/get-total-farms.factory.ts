import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { DashboardRepositoryImpl } from '../repository/dashboard.repository';
import { GetTotalFarmsUseCase } from 'src/application/usecases/dashboard/get-total-farms.use-case';

export const getTotalFarmsUseCaseFactory = {
  provide: 'GET_TOTAL_FARMS_USE_CASE',
  useFactory: (dashboardRepository: DashboardRepository) => new GetTotalFarmsUseCase(dashboardRepository),
  inject: [DashboardRepositoryImpl],
};
