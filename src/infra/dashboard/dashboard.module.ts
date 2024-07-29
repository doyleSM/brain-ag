import { Module } from '@nestjs/common';
import { DashboardRepositoryImpl } from './repository/dashboard.repository';
import { DatabaseModule } from '../database/database.module';
import { getTotalAreaUseCaseFactory } from './factories/get-total-area.use-case.factory';
import { getTotalFarmsByCropUseCaseFactory } from './factories/get-total-farms-by-crop.use-case.factory';
import { getTotalFarmsByStateUseCaseFactory } from './factories/get-total-farms-by-state.use-case.factory';
import { getTotalFarmsUseCaseFactory } from './factories/get-total-farms.factory';
import { getTotalLandUseUseCaseFactory } from './factories/get-total-land-use.use-case.factory';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    DashboardRepositoryImpl,
    getTotalAreaUseCaseFactory,
    getTotalFarmsByCropUseCaseFactory,
    getTotalFarmsByStateUseCaseFactory,
    getTotalFarmsUseCaseFactory,
    getTotalLandUseUseCaseFactory,
  ],
  exports: [DashboardRepositoryImpl],
  controllers: [DashboardController],
})
export class DashboardModule {}
