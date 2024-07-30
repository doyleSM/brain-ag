import { UnitOfWorkMock } from 'src/mocks/infra/repositories/unit-of-work.mock';
import { cropRepositoryMock } from 'src/mocks/infra/repositories/crop.repository.mock';
import { farmRepositoryMock } from 'src/mocks/infra/repositories/farm.repository.mock';
import { FarmerRepositoryMock } from 'src/mocks/infra/repositories/farmer.repository.mock';
import { Crop } from 'src/domain/entities/crop';

import { Farm } from 'src/domain/entities/farm';
import { Farmer } from 'src/domain/entities/farmer';
import { DeleteFarmUseCase } from './delete-farm-use-case';

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

describe('DeleteFarmUseCase', () => {
  let deleteFarmUseCase: DeleteFarmUseCase;
  let mockUnitOfWork;

  beforeEach(() => {
    mockUnitOfWork = new UnitOfWorkMock(cropRepositoryMock, farmRepositoryMock, FarmerRepositoryMock);
    deleteFarmUseCase = new DeleteFarmUseCase(mockUnitOfWork);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a farm successfully', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    const commitSpy = jest.spyOn(mockUnitOfWork, 'commit');
    await deleteFarmUseCase.execute({ farmId: defaultMockInput.farmId });

    expect(mockUnitOfWork.farmRepository.delete).toHaveBeenCalled();
    expect(mockUnitOfWork.farmerRepository.delete).toHaveBeenCalled();
    expect(commitSpy).toHaveBeenCalled();
    expect(mockUnitOfWork.farmRepository.findById).toHaveBeenCalledWith(defaultMockInput.farmId);
    expect(mockUnitOfWork.farmRepository.delete).toHaveBeenCalledWith(defaultExistingFarm);
    expect(mockUnitOfWork.farmerRepository.delete).toHaveBeenCalledWith(defaultExistingFarmer);
  });

  it('should throw an error if the farm does not exist', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(null);

    await expect(deleteFarmUseCase.execute({ farmId: defaultMockInput.farmId })).rejects.toThrowError(
      `Farm with id ${defaultMockInput.farmId} not found`,
    );
  });

  it('should rollback the transaction if an error occurs', async () => {
    mockUnitOfWork.farmRepository.findById.mockResolvedValue(defaultExistingFarm);
    mockUnitOfWork.farmRepository.delete.mockRejectedValue(new Error('Delete farm error'));

    const rollbackSpy = jest.spyOn(mockUnitOfWork, 'rollback');

    await expect(deleteFarmUseCase.execute({ farmId: defaultMockInput.farmId })).rejects.toThrow('Delete farm error');

    expect(mockUnitOfWork.farmRepository.delete).toHaveBeenCalled();
    expect(mockUnitOfWork.farmerRepository.delete).not.toHaveBeenCalled();
    expect(rollbackSpy).toHaveBeenCalled();
  });
});
