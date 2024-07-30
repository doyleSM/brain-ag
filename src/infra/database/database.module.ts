import { Module } from '@nestjs/common';
import { UnitOfWorkImpl } from './unit-of-work.repository';
import { CropRepositoryImpl } from '../crop/repository/crop.repository';
import { FarmerRepositoryImpl } from '../farmer/repository/farmer.repository';
import { FarmRepositoryImpl } from '../farm/repository/farm.repository';
import { databaseProviders } from './factories/database.provider';
import { testDatabaseProviders } from './factories/database.memory.provider';

const isTestEnvironment = process.env.NODE_ENV === 'test';
const dbProviders = isTestEnvironment ? testDatabaseProviders : databaseProviders;

@Module({
  providers: [...dbProviders, UnitOfWorkImpl, CropRepositoryImpl, FarmerRepositoryImpl, FarmRepositoryImpl],
  exports: [...dbProviders, UnitOfWorkImpl],
})
export class DatabaseModule {}
