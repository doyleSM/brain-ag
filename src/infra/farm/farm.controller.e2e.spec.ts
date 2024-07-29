import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Crop } from 'src/domain/entities/crop';
import { CropRepositoryImpl } from '../crop/repository/crop.repository';

describe('FarmController (e2e)', () => {
  let app: INestApplication;
  let crops: Crop[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

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

  it('/farms (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '24468715006',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Farm 1');
    expect(response.body.city).toEqual('City 1');
    expect(response.body.state).toEqual('RS');
    expect(response.body.totalAreaHectares).toEqual(100);
    expect(response.body.cultivableAreaHectares).toEqual(50);
    expect(response.body.vegetationAreaHectares).toEqual(50);
    expect(response.body.farmer.name).toEqual('Farmer 1');
    expect(response.body.farmer.cpfCnpj).toEqual('24468715006');
    expect(response.body.crops.length).toEqual(1);
    expect(response.body.crops[0].id).toEqual('4362f0c7-fc53-496c-95c9-130f4b8eac25');
  });

  it('/farms (POST) invalid CPF', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '24468715015',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(['CPF or CNPJ is invalid']);
  });

  it('/farms (POST) invalid CNPJ', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '37486750000000',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(['CPF or CNPJ is invalid']);
  });

  it('/farms (POST) invalid state', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS3',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '37486750000125',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(['state must be shorter than or equal to 2 characters']);
  });

  it('/farms (POST) invalid crop uuid', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '37486750000125',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(['each value in crops must be a UUID']);
  });

  it('/farms (POST) invalid total area', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 10,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '37486750000125',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual([
      'Vegetation area cannot be negative and the sum with agricultural area cannot be greater than total area',
    ]);
  });

  it('/farms (POST) invalid cultivable area', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 60,
        vegetationAreaHectares: 50,
        cpfCnpj: '37486750000125',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual([
      'Vegetation area cannot be negative and the sum with agricultural area cannot be greater than total area',
    ]);
  });

  it('farms/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        farmerName: 'Farmer 1',
        farmName: 'Farm 1',
        city: 'City 1',
        state: 'RS',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        cpfCnpj: '24468715006',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });

    const responsePatch = await request(app.getHttpServer())
      .patch(`/farms/${response.body.id}`)
      .send({
        farmerName: 'Farmer 2',
        farmName: 'Farm 2',
        city: 'City 2',
        state: 'SC',
        cpfCnpj: '24468715006',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body.name).toEqual('Farm 2');
    expect(responsePatch.body.city).toEqual('City 2');
    expect(responsePatch.body.state).toEqual('SC');
    expect(responsePatch.body.farmer.name).toEqual('Farmer 2');
    expect(responsePatch.body.farmer.cpfCnpj).toEqual('24468715006');
  });

  it('farms/:id (PATCH)', async () => {
    const responsePatch = await request(app.getHttpServer())
      .patch(`/farms/${'80c86689-72b4-4162-8f9e-8d2c23e4d685'}`)
      .send({
        farmerName: 'Farmer 2',
        farmName: 'Farm 2',
        city: 'City 2',
        state: 'SC',
        cpfCnpj: '111111',
        crops: ['4362f0c7-fc53-496c-95c9-130f4b8eac25'],
      });
    expect(responsePatch.status).toEqual(400);
    expect(responsePatch.body.message).toEqual(['CPF or CNPJ is invalid']);
  });
});
