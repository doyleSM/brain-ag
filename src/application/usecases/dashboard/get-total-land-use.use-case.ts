import BaseUseCase from '../base.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { TotalLandUse } from 'src/domain/types/total-land-use.type';

export class GetTotalLandUseUseCase implements BaseUseCase<void, TotalLandUse> {
  constructor(private dashboardRepository: DashboardRepository) {}
  async execute(): Promise<TotalLandUse> {
    try {
      return this.dashboardRepository.getTotalLandUse();
    } catch (error) {
      throw error;
    }
  }
}
