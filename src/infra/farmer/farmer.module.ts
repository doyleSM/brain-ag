import { Module } from '@nestjs/common';
import { FarmerRepositoryImpl } from './repository/farmer.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FarmerRepositoryImpl],
  exports: [FarmerRepositoryImpl],
})
export class FarmerModule {}
