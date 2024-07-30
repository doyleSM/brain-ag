import { dashboardRepositoryMock } from 'src/mocks/infra/repositories/dashboard.repository.mock';
import { GetTotalFarmsByCropUseCase } from './get-total-farms-by-crop.use-case';

describe('GetTotalFarmsByCropUseCase', () => {
  let getTotalFarmsByCropUseCase: GetTotalFarmsByCropUseCase;

  beforeEach(() => {
    getTotalFarmsByCropUseCase = new GetTotalFarmsByCropUseCase(dashboardRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total farms properly', async () => {
    dashboardRepositoryMock.getTotalFarmByCrop.mockResolvedValue([
      { cropName: 'soybean', totalFarms: 100 },
      { cropName: 'corn', totalFarms: 200 },
      { cropName: 'cotton', totalFarms: 300 },
      { cropName: 'coffee', totalFarms: 400 },
      { cropName: 'sugarcane', totalFarms: 500 },
    ]);

    const result = await getTotalFarmsByCropUseCase.execute();

    expect(dashboardRepositoryMock.getTotalFarmByCrop).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Array));
    expect(result[0]).toHaveProperty('cropName');
    expect(result[0]).toHaveProperty('totalFarms');
    expect(result.length).toBe(5);
  });

  it('should throw an error if repository throws an error', async () => {
    dashboardRepositoryMock.getTotalFarmByCrop.mockRejectedValue(new Error('Error message'));

    await expect(getTotalFarmsByCropUseCase.execute()).rejects.toThrow('Error message');
  });
});
