import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { FarmerModule } from './infra/farmer/farmer.module';
import { CropModule } from './infra/crop/crop.module';
import { FarmModule } from './infra/farm/farm.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './infra/filter/exception.filter';
import { DashboardModule } from './infra/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    FarmerModule,
    CropModule,
    FarmModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
