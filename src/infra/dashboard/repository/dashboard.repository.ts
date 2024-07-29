import { Inject, Injectable, Scope } from '@nestjs/common';

import { DashboardRepository } from 'src/domain/interfaces/dashboard.repository';
import { TotalArea } from 'src/domain/types/total-area.type';
import { TotalFarmByCrop } from 'src/domain/types/total-farm-by-crop.type';
import { TotalFarmByState } from 'src/domain/types/total-farm-by-state.type';
import { TotalFarms } from 'src/domain/types/total-farms.type';
import { TotalLandUse } from 'src/domain/types/total-land-use.type';
import { DataSource } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class DashboardRepositoryImpl implements DashboardRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async getTotalArea(): Promise<TotalArea> {
    const res = await this.dataSource.query('SELECT SUM(total_area) FROM farms');
    return {
      totalArea: Number(res[0].sum),
    };
  }

  async getTotalFarmByCrop(): Promise<TotalFarmByCrop[]> {
    const totalFarmByCrop = await this.dataSource.query(
      'SELECT c.name AS crop_name, COUNT(*) AS total_farms  \
      FROM farms_crops fc                                     \
      JOIN crops c ON fc.crop_id = c.id                      \
      GROUP BY c.name;',
    );

    return totalFarmByCrop.map((item) => {
      return {
        cropName: item.crop_name,
        totalFarms: Number(item.total_farms),
      };
    });
  }

  async getTotalFarmByState(): Promise<TotalFarmByState[]> {
    const totalFarmByState = await this.dataSource.query('SELECT state, COUNT(*) as count FROM farms GROUP BY state');
    return totalFarmByState.map((item) => {
      return {
        state: item.state,
        totalFarms: Number(item.count),
      };
    });
  }

  async getTotalFarms(): Promise<TotalFarms> {
    const res = await this.dataSource.query('SELECT COUNT(*) as count FROM farms;');
    return {
      totalFarms: Number(res[0].count),
    };
  }

  async getTotalLandUse(): Promise<TotalLandUse> {
    const totalLandUse = await this.dataSource.query(
      'SELECT SUM(cultivable_area) AS total_cultivable_area, SUM(vegetation_area) AS total_vegetation_area FROM farms;',
    );

    return {
      totalCultivableArea: Number(totalLandUse[0].total_cultivable_area),
      totalVegetationArea: Number(totalLandUse[0].total_vegetation_area),
    };
  }
}
