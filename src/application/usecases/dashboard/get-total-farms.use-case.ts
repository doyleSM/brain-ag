import BaseUseCase from '../base.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { TotalFarms } from 'src/domain/types/total-farms.type';

export class GetTotalFarmsUseCase implements BaseUseCase<void, TotalFarms> {
  constructor(private dashboardRepository: DashboardRepository) {}
  async execute(): Promise<TotalFarms> {
    try {
      return this.dashboardRepository.getTotalFarms();
    } catch (error) {
      throw error;
    }
  }
}
