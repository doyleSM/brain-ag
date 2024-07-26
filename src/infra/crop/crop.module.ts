import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CropRepositoryImpl } from './repository/crop.repository';
import { listCropUseCaseFactory } from './factories/list-crop-usecase.factory';
import { CropController } from './crop.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CropRepositoryImpl, listCropUseCaseFactory],
  exports: [CropRepositoryImpl],
  controllers: [CropController],
})
export class CropModule {}
