import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { DashboardRepositoryImpl } from '../repository/dashboard.repository';
import { GetTotalFarmsByStateUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-state.use-case';

export const getTotalFarmsByStateUseCaseFactory = {
  provide: 'GET_TOTAL_FARMS_BY_STATE_USE_CASE',
  useFactory: (dashboardRepository: DashboardRepository) => new GetTotalFarmsByStateUseCase(dashboardRepository),
  inject: [DashboardRepositoryImpl],
};
