import { Module } from '@nestjs/common';
import { UnitOfWorkImpl } from './unit-of-work.repository';
import { CropRepositoryImpl } from '../crop/repository/crop.repository';
import { FarmerRepositoryImpl } from '../farmer/repository/farmer.repository';
import { FarmRepositoryImpl } from '../farm/repository/farm.repository';
import { testDatabaseProviders } from './factories/database.memory.provider';

@Module({
  providers: [...testDatabaseProviders, UnitOfWorkImpl, CropRepositoryImpl, FarmerRepositoryImpl, FarmRepositoryImpl],
  exports: [...testDatabaseProviders, UnitOfWorkImpl],
})
export class DatabaseModule {}
