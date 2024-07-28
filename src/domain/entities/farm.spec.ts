import { ValidationError } from '../errors/validation.error';
import { Crop } from './crop';
import { Farm } from './farm';
import { Farmer } from './farmer';

describe('Farm', () => {
  it('should create a Farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50, '6bafa057-6f9f-4657-82c9-b18a89758a52');
    const crop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    farm.addCrops([crop]);
    const farmer = new Farmer('12345678901', 'John Doe', '6bafa057-6f9f-4657-82c9-b18a89758a52');
    farm.farmer = farmer;

    expect(farm.toJson()).toEqual({
      name: 'Farm 1',
      id: '6bafa057-6f9f-4657-82c9-b18a89758a52',
      city: 'City 1',
      state: 'S1',
      totalAreaHectares: 100,
      cultivableAreaHectares: 50,
      vegetationAreaHectares: 50,
      farmer: {
        cpfCnpj: '12345678901',
        name: 'John Doe',
        id: '6bafa057-6f9f-4657-82c9-b18a89758a52',
      },
      crops: [
        {
          name: 'corn',
          id: 'fe965a29-032a-4272-ad96-6d4bd6acd4c6',
        },
      ],
    });
  });

  it('should throw error if cultivable area is negative', async () => {
    expect(() => new Farm('Farm 1', 'City 1', 'S1', 100, -50, 50)).toThrow(
      new ValidationError('Agricultural area cannot be negative and the sum with vegetation area cannot be greater than total area'),
    );
  });

  it('should throw error if vegetation area is negative', async () => {
    expect(() => new Farm('Farm 1', 'City 1', 'S1', 100, 50, -50)).toThrow(
      new ValidationError('Vegetation area cannot be negative and the sum with agricultural area cannot be greater than total area'),
    );
  });

  it('should throw error if total area is negative', async () => {
    expect(() => new Farm('Farm 1', 'City 1', 'S1', -100, 50, 50)).toThrow(
      new ValidationError('Total area cannot be negative and must be greater than the sum of cultivable and vegetation area'),
    );
  });

  it('should update the name of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.name = 'Farm 2';
    expect(farm.name).toEqual('Farm 2');
  });

  it('should update the city of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.city = 'City 2';
    expect(farm.city).toEqual('City 2');
  });

  it('should update the state of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.state = 'S2';
  });

  it('should update the total area of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.totalAreaHectares = 200;
    expect(farm.totalAreaHectares).toEqual(200);
  });

  it('should update the cultivable area of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.cultivableAreaHectares = 25;
    expect(farm.cultivableAreaHectares).toEqual(25);
  });

  it('should update the vegetation area of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    farm.vegetationAreaHectares = 21;
    expect(farm.vegetationAreaHectares).toEqual(21);
  });

  it('should update the farmer of the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    const farmer = new Farmer('12345678901', 'John Doe', '6bafa057-6f9f-4657-82c9-b18a89758a52');
    farm.farmer = farmer;
    expect(farm.farmer).toEqual(farmer);
  });

  it('should add a crop to the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    const crop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    farm.addCrops([crop]);
    expect(farm.crops).toEqual([crop]);
  });

  it('should remove a crop from the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    const crop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    const crop2 = new Crop('sugarcane', '4362f0c7-fc53-496c-95c9-130f4b8eac25');

    farm.addCrops([crop, crop2]);
    farm.removeCrop(crop);
    expect(farm.crops).toEqual([crop2]);
  });
  it('should throw if cultivable area is greater than total area', async () => {
    expect(() => new Farm('Farm 1', 'City 1', 'S1', 100, 110, 50)).toThrow(
      new ValidationError('Vegetation area cannot be negative and the sum with agricultural area cannot be greater than total area'),
    );
  });

  it('should throw if updated cultivable area is greater than total area', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    expect(() => (farm.cultivableAreaHectares = 60)).toThrow(
      new ValidationError('Agricultural area cannot be negative and the sum with vegetation area cannot be greater than total area'),
    );
  });
  it('should throw if updated vegetation area is greater than total area', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    expect(() => (farm.vegetationAreaHectares = 60)).toThrow(
      new ValidationError('Vegetation area cannot be negative and the sum with agricultural area cannot be greater than total area'),
    );
  });
  it('should throw if updated total area is less than cultivable and vegetation area', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    expect(() => (farm.totalAreaHectares = 90)).toThrow(
      new ValidationError('Total area cannot be negative and must be greater than the sum of cultivable and vegetation area'),
    );
  });

  it('should throw if name is empty', async () => {
    expect(() => new Farm('', 'City 1', 'S1', 100, 50, 50)).toThrow(new ValidationError('Name cannot be empty'));
  });
  it('should throw if city is empty', async () => {
    expect(() => new Farm('Farm 1', '', 'S1', 100, 50, 50)).toThrow(new ValidationError('City cannot be empty'));
  });
  it('should throw if state is empty', async () => {
    expect(() => new Farm('Farm 1', 'City 1', '', 100, 50, 50)).toThrow(new ValidationError('State cannot be empty'));
  });
  it('should remove crops from the farm', async () => {
    const farm = new Farm('Farm 1', 'City 1', 'S1', 100, 50, 50);
    const crop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    const crop2 = new Crop('sugarcane', '4362f0c7-fc53-496c-95c9-130f4b8eac25');

    farm.addCrops([crop, crop2]);
    farm.removeCrops([crop]);
    expect(farm.crops).toEqual([crop2]);
  });
});
