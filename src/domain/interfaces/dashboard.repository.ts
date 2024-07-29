import { TotalArea } from '../types/total-area.type';
import { TotalFarmByCrop } from '../types/total-farm-by-crop.type';
import { TotalFarmByState } from '../types/total-farm-by-state.type';
import { TotalFarms } from '../types/total-farms.type';
import { TotalLandUse } from '../types/total-land-use.type';

export interface DashboardRepository {
  getTotalArea(): Promise<TotalArea>;
  getTotalFarmByCrop(): Promise<TotalFarmByCrop[]>;
  getTotalFarmByState(): Promise<TotalFarmByState[]>;
  getTotalFarms(): Promise<TotalFarms>;
  getTotalLandUse(): Promise<TotalLandUse>;
}
