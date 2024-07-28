import { UnitOfWorkMock } from 'src/mocks/infra/repositories/unit-of-work.mock';
import { cropRepositoryMock } from 'src/mocks/infra/repositories/crop.repository.mock';
import { farmRepositoryMock } from 'src/mocks/infra/repositories/farm.repository.mock';
import { FarmerRepositoryMock } from 'src/mocks/infra/repositories/farmer.repository.mock';
import { Crop } from 'src/domain/entities/crop';
import { ListCropsUseCase } from './list-crops-use-case';

const defaulListCrops = [
  new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6'),
  new Crop('soybean', '80c86689-72b4-4162-8f9e-8d2c23e4d685'),
  new Crop('cotton', 'f9bad013-086d-4026-b2e6-5f366a879f11'),
  new Crop('coffee', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc'),
  new Crop('sugarcane', '4362f0c7-fc53-496c-95c9-130f4b8eac25'),
];

describe('ListCropUseCase', () => {
  let listCropsUseCase: ListCropsUseCase;
  let mockUnitOfWork;

  beforeEach(() => {
    mockUnitOfWork = new UnitOfWorkMock(cropRepositoryMock, farmRepositoryMock, FarmerRepositoryMock);
    listCropsUseCase = new ListCropsUseCase(mockUnitOfWork);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list crops successfully', async () => {
    mockUnitOfWork.cropRepository.findAll.mockResolvedValue(defaulListCrops);

    const result = await listCropsUseCase.execute();

    expect(mockUnitOfWork.cropRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(5);
  });

  it('should throw error if cropRepository throws error', async () => {
    mockUnitOfWork.cropRepository.findAll.mockRejectedValue(new Error('Error listing crops'));

    await expect(listCropsUseCase.execute()).rejects.toThrow('Error listing crops');
  });
});
