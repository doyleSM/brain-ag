import { Module } from '@nestjs/common';
import { UnitOfWorkImpl } from './unit-of-work.repository';
import { CropRepositoryImpl } from '../crop/repository/crop.repository';
import { FarmerRepositoryImpl } from '../farmer/repository/farmer.repository';
import { FarmRepositoryImpl } from '../farm/repository/farm.repository';
import { databaseProviders } from './factories/database.provider';

@Module({
  providers: [...databaseProviders, UnitOfWorkImpl, CropRepositoryImpl, FarmerRepositoryImpl, FarmRepositoryImpl],
  exports: [...databaseProviders, UnitOfWorkImpl],
})
export class DatabaseModule {}
