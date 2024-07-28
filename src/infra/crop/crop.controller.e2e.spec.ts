import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CropRepositoryImpl } from './repository/crop.repository';
import { Crop } from 'src/domain/entities/crop';

describe('CropController (e2e)', () => {
  let app: INestApplication;
  let crops: Crop[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const cropRepo = await app.resolve(CropRepositoryImpl);
    crops = [
      new Crop('soybean', '80c86689-72b4-4162-8f9e-8d2c23e4d685'),
      new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6'),
      new Crop('cotton', 'f9bad013-086d-4026-b2e6-5f366a879f11'),
      new Crop('coffee', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc'),
      new Crop('sugarcane', '4362f0c7-fc53-496c-95c9-130f4b8eac25'),
    ];
    for await (const crop of crops) {
      await cropRepo.save(crop);
    }
  });

  it('/crops/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/crops/')
      .expect(200)
      .expect(crops.map((crop) => crop.toJson()));
  });
});
