import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FarmRepositoryImpl } from './repository/farm.repository';
import { createFarmUseCaseFactory } from './factories/create-farm-usecase.factory';
import { FarmController } from './farm.controller';
import { updateFarmUseCaseFactory } from './factories/update-farm-usecase.factory';
import { deleteFarmUseCaseFactory } from './factories/delete-farm-usecase.factory';

@Module({
  imports: [DatabaseModule],
  providers: [FarmRepositoryImpl, createFarmUseCaseFactory, updateFarmUseCaseFactory, deleteFarmUseCaseFactory],
  exports: [FarmRepositoryImpl],
  controllers: [FarmController],
})
export class FarmModule {}
