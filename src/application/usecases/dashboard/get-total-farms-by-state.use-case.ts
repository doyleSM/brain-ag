import BaseUseCase from '../base.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { TotalFarmByState } from 'src/domain/types/total-farm-by-state.type';

export class GetTotalFarmsByStateUseCase implements BaseUseCase<void, TotalFarmByState[]> {
  constructor(private dashboardRepository: DashboardRepository) {}
  async execute(): Promise<TotalFarmByState[]> {
    try {
      return this.dashboardRepository.getTotalFarmByState();
    } catch (error) {
      throw error;
    }
  }
}
