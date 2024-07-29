import BaseUseCase from '../base.use-case';
import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { TotalFarmByCrop } from 'src/domain/types/total-farm-by-crop.type';

export class GetTotalFarmsByCropUseCase implements BaseUseCase<void, TotalFarmByCrop[]> {
  constructor(private dashboardRepository: DashboardRepository) {}
  async execute(): Promise<TotalFarmByCrop[]> {
    try {
      return this.dashboardRepository.getTotalFarmByCrop();
    } catch (error) {
      throw error;
    }
  }
}
