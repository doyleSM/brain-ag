import { CreateFarmUseCase } from './create-farm.use-case';
import { UnitOfWorkMock } from 'src/mocks/infra/repositories/unit-of-work.mock';
import { cropRepositoryMock } from 'src/mocks/infra/repositories/crop.repository.mock';
import { farmRepositoryMock } from 'src/mocks/infra/repositories/farm.repository.mock';
import { FarmerRepositoryMock } from 'src/mocks/infra/repositories/farmer.repository.mock';
import { Crop } from 'src/domain/entities/crop';
import { Farmer } from 'src/domain/entities/farmer';
import { ConflictError } from 'src/domain/errors/conflict.error';
import { UnprocessableEntityError } from 'src/domain/errors/unprocessable-entity.error';

const defaultMockInput = {
  cpfCnpj: '12345678901',
  farmerName: 'John Doe',
  farmName: 'Doe Farm',
  city: 'Doe City',
  state: 'Doe State',
  totalAreaHectares: 100,
  cultivableAreaHectares: 50,
  vegetationAreaHectares: 50,
  crops: ['fe965a29-032a-4272-ad96-6d4bd6acd4c6'],
};

describe('CreateFarmUseCase', () => {
  let createFarmUseCase: CreateFarmUseCase;
  let mockUnitOfWork;

  beforeEach(() => {
    mockUnitOfWork = new UnitOfWorkMock(cropRepositoryMock, farmRepositoryMock, FarmerRepositoryMock);
    createFarmUseCase = new CreateFarmUseCase(mockUnitOfWork);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a farm successfully', async () => {
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(undefined);
    mockUnitOfWork.cropRepository.findByIds.mockResolvedValue([new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6')]);

    const result = await createFarmUseCase.execute(defaultMockInput);

    expect(mockUnitOfWork.farmerRepository.save).toHaveBeenCalled();
    expect(mockUnitOfWork.cropRepository.findByIds).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('farmer');
    expect(result).toHaveProperty('name', defaultMockInput.farmName);
    expect(result).toHaveProperty('city', defaultMockInput.city);
    expect(result).toHaveProperty('state', defaultMockInput.state);
    expect(result).toHaveProperty('totalAreaHectares', defaultMockInput.totalAreaHectares);
    expect(result).toHaveProperty('cultivableAreaHectares', defaultMockInput.cultivableAreaHectares);
    expect(result).toHaveProperty('vegetationAreaHectares', defaultMockInput.vegetationAreaHectares);
    expect(result).toHaveProperty('crops', expect.any(Array));
    expect(result.crops).toHaveLength(1);
    expect(result.crops[0]).toHaveProperty('id', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    expect(result.crops[0]).toHaveProperty('name', 'corn');
  });

  it('should throw ConflictError if farmer already exists', async () => {
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(new Farmer('John Doe', '12345678901'));

    await expect(createFarmUseCase.execute(defaultMockInput)).rejects.toThrow(ConflictError);
  });

  it('should throw UnprocessableEntityError if any crop is not found', async () => {
    mockUnitOfWork.farmerRepository.findByCpfCnpj.mockResolvedValue(undefined);
    mockUnitOfWork.cropRepository.findByIds.mockResolvedValue([new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6')]);

    const mockInput = {
      cpfCnpj: '12345678901',
      farmerName: 'John Doe',
      farmName: 'Doe Farm',
      city: 'Doe City',
      state: 'Doe State',
      totalAreaHectares: 100,
      cultivableAreaHectares: 50,
      vegetationAreaHectares: 50,
      crops: ['6c69a97b-fe1c-4e02-8b84-95bbb95b451c'],
    };

    await expect(createFarmUseCase.execute(mockInput)).rejects.toThrow(UnprocessableEntityError);
  });
});
