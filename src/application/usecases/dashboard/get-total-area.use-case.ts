import { TotalArea } from 'src/domain/types/total-area.type';
import BaseUseCase from '../base.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';

export class GetTotalAreaUseCase implements BaseUseCase<void, TotalArea> {
  constructor(private dashboardRepository: DashboardRepository) {}
  async execute(): Promise<TotalArea> {
    try {
      return this.dashboardRepository.getTotalArea();
    } catch (error) {
      throw error;
    }
  }
}
