import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FarmRepositoryImpl } from './repository/farm.repository';
import { createFarmUseCaseFactory } from './factories/create-farm-usecase.factory';
import { FarmController } from './farm.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FarmRepositoryImpl, createFarmUseCaseFactory],
  exports: [FarmRepositoryImpl],
  controllers: [FarmController],
})
export class FarmModule {}
