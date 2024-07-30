import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Crop } from 'src/domain/entities/crop';
import { CropRepositoryImpl } from '../crop/repository/crop.repository';
import { Farm } from 'src/domain/entities/farm';
import { FarmRepositoryImpl } from '../farm/repository/farm.repository';
import { FarmerRepositoryImpl } from '../farmer/repository/farmer.repository';
import { Farmer } from 'src/domain/entities/farmer';

describe('DashboardController (e2e)', () => {
  let app: INestApplication;
  let crops: Crop[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const cropRepo = await app.resolve(CropRepositoryImpl);
    const farmRepo = await app.resolve(FarmRepositoryImpl);
    const farmerRepo = await app.resolve(FarmerRepositoryImpl);
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
    const farmer = new Farmer('Farmer 1', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
    const farmer2 = new Farmer('Farmer 2', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');

    const farm = new Farm('Fazenda Bela Vista', 'Araraquara', 'SP', 500.0, 400.0, 100.0, 'c3b30e58-d9ca-491c-bc31-747a00ddface');
    farm.farmer = farmer;
    farm.addCrops([crops[0], crops[1]]);
    const farm2 = new Farm('Fazenda Boa Vista', 'Rio de Janeiro', 'RJ', 700.0, 300, 200.0, '72a21de6-1d90-44a0-8c8e-e341c4e7907c');
    farm2.farmer = farmer2;
    farm2.addCrops([crops[2], crops[3]]);

    await farmerRepo.save(farmer);
    await farmerRepo.save(farmer2);

    await farmRepo.save(farm);
    await farmRepo.save(farm2);
  });

  it('/dashboard (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/dashboard/');
    expect(response.status).toEqual(200);
    expect(response.body.totalArea).toEqual(1200);
    expect(response.body.totalFarmsByCrop.length).toEqual(4);
    expect(response.body.totalFarmsByState.length).toEqual(2);
    expect(response.body.totalFarms).toEqual(2);
    expect(response.body.totalLandUse.totalCultivableArea).toEqual(700);
    expect(response.body.totalLandUse.totalVegetationArea).toEqual(300);
  });
});
