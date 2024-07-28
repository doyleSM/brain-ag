import { UnitOfWorkMock } from 'src/mocks/infra/repositories/unit-of-work.mock';
import { cropRepositoryMock } from 'src/mocks/infra/repositories/crop.repository.mock';
import { farmRepositoryMock } from 'src/mocks/infra/repositories/farm.repository.mock';
import { FarmerRepositoryMock } from 'src/mocks/infra/repositories/farmer.repository.mock';
import { Crop } from 'src/domain/entities/crop';

import { UpdateFarmUseCase } from './update-farm.use-case';
import { Farm } from 'src/domain/entities/farm';
import { Farmer } from 'src/domain/entities/farmer';

const defaultMockInput = {
  farmId: '170b94ec-f1cb-445c-9318-65fd52d406c0',
  input: {
    cpfCnpj: '12345678901',
    farmerName: 'John Doe',
    farmName: 'Doe Farm',
    city: 'Doe City',
    state: 'Doe State',
    totalAreaHectares: 100,
    cultivableAreaHectares: 50,
    vegetationAreaHectares: 50,
    crops: ['fe965a29-032a-4272-ad96-6d4bd6acd4c6'],
  },
};

const defaultExistingFarmer = new Farmer('John Doe', '12345678901', 'a5542a2a-5de5-4063-9197-04f80de998f1');
const defaultExistingCrop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
const defaultExistingFarm = new Farm('Doe Farm', 'Doe City', 'Doe State', 100, 50, 50, '170b94ec-f1cb-445c-9318-65fd52d406c0');
defaultExistingFarm.farmer = defaultExistingFarmer;
defaultExistingFarm.addCrops([defaultExistingCrop]);

describe('UpdateFarmUseCase', () => {
  let updateFarmUseCase: UpdateFarmUseCase;
  let mockUnitOfWork;

  beforeEach(() => {
    mockUnitOfWork = new UnitOfWorkMock(cropRepositoryMock, farmRepositoryMock, FarmerRepositoryMock);
    updateFarmUseCase = new UpdateFarmUseCase(mockUnitOfWork);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a farm successfully', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(undefined);
    mockUnitOfWork.cropRepository.findByIds.mockResolvedValue([defaultExistingCrop]);

    const result = await updateFarmUseCase.execute(defaultMockInput);

    expect(mockUnitOfWork.farmerRepository.save).toHaveBeenCalled();
    expect(mockUnitOfWork.cropRepository.findByIds).toHaveBeenCalled();
    expect(mockUnitOfWork.farmerRepository.findByCpfCnpj).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('farmer');
    expect(result).toHaveProperty('name', defaultMockInput.input.farmName);
    expect(result).toHaveProperty('city', defaultMockInput.input.city);
    expect(result).toHaveProperty('state', defaultMockInput.input.state);
    expect(result).toHaveProperty('totalAreaHectares', defaultMockInput.input.totalAreaHectares);
    expect(result).toHaveProperty('cultivableAreaHectares', defaultMockInput.input.cultivableAreaHectares);
    expect(result).toHaveProperty('vegetationAreaHectares', defaultMockInput.input.vegetationAreaHectares);
    expect(result).toHaveProperty('crops', expect.any(Array));
    expect(result.farmer).toHaveProperty('id', 'a5542a2a-5de5-4063-9197-04f80de998f1');
    expect(result.farmer).toHaveProperty('name', 'John Doe');
    expect(result.crops).toHaveLength(1);
    expect(result.crops[0]).toHaveProperty('id', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    expect(result.crops[0]).toHaveProperty('name', 'corn');
  });

  it('should update a farm successfully without changing the farmer', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    mockUnitOfWork.cropRepository.findByIds.mockResolvedValue([defaultExistingCrop]);

    const input = {
      farmId: '170b94ec-f1cb-445c-9318-65fd52d406c0',
      input: {
        farmName: 'Doe Farm',
        city: 'Doe City',
        state: 'Doe State',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        crops: ['fe965a29-032a-4272-ad96-6d4bd6acd4c6'],
      },
    };

    const result = await updateFarmUseCase.execute(input);

    expect(mockUnitOfWork.cropRepository.findByIds).toHaveBeenCalled();
    expect(mockUnitOfWork.farmerRepository.findByCpfCnpj).not.toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('farmer');
    expect(result).toHaveProperty('name', defaultMockInput.input.farmName);
    expect(result).toHaveProperty('city', defaultMockInput.input.city);
    expect(result).toHaveProperty('state', defaultMockInput.input.state);
    expect(result).toHaveProperty('totalAreaHectares', defaultMockInput.input.totalAreaHectares);
    expect(result).toHaveProperty('cultivableAreaHectares', defaultMockInput.input.cultivableAreaHectares);
    expect(result).toHaveProperty('vegetationAreaHectares', defaultMockInput.input.vegetationAreaHectares);
    expect(result).toHaveProperty('crops', expect.any(Array));
    expect(result.farmer).toHaveProperty('id', defaultExistingFarmer.id);
    expect(result.farmer).toHaveProperty('name', defaultExistingFarmer.name);
    expect(result.crops).toHaveLength(1);
    expect(result.crops[0]).toHaveProperty('id', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    expect(result.crops[0]).toHaveProperty('name', 'corn');
  });

  it('should throw NotFoundError if farm is not found', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(undefined);

    await expect(updateFarmUseCase.execute(defaultMockInput)).rejects.toThrow(`Farm with id ${defaultMockInput.farmId} not found`);
    expect(mockUnitOfWork.farmerRepository.findByCpfCnpj).not.toHaveBeenCalled();
    expect(mockUnitOfWork.cropRepository.findByIds).not.toHaveBeenCalled();
  });

  it('should throw ConflictError if farmer already exists', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(new Farmer('John Doe', '12345678901'));

    await expect(updateFarmUseCase.execute(defaultMockInput)).rejects.toThrow(
      `Farmer with CPF/CNPJ ${defaultMockInput.input.cpfCnpj} already exists`,
    );
    expect(mockUnitOfWork.cropRepository.findByIds).not.toHaveBeenCalled();
  });

  it('should throw UnprocessableEntityError if any crop is not found', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(undefined);
    mockUnitOfWork.cropRepository.findByIds.mockResolvedValue([defaultExistingCrop]);

    const input = {
      farmId: '170b94ec-f1cb-445c-9318-65fd52d406c0',
      input: {
        cpfCnpj: '12345678901',
        farmerName: 'John Doe',
        farmName: 'Doe Farm',
        city: 'Doe City',
        state: 'Doe State',
        totalAreaHectares: 100,
        cultivableAreaHectares: 50,
        vegetationAreaHectares: 50,
        crops: ['6c69a97b-fe1c-4e02-8b84-95bbb95b451c'],
      },
    };

    await expect(updateFarmUseCase.execute(input)).rejects.toThrow(`Crop with id ${input.input.crops[0]} not found`);
  });
});
