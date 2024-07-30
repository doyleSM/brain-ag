import { dashboardRepositoryMock } from 'src/mocks/infra/repositories/dashboard.repository.mock';
import { GetTotalLandUseUseCase } from './get-total-land-use.use-case';

describe('GetTotalLandUseUseCase', () => {
  let getTotalLandUseUseCase: GetTotalLandUseUseCase;

  beforeEach(() => {
    getTotalLandUseUseCase = new GetTotalLandUseUseCase(dashboardRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total land used properly', async () => {
    dashboardRepositoryMock.getTotalLandUse.mockResolvedValue({
      totalCultivableArea: 350,
      totalVegetationArea: 150,
    });

    const result = await getTotalLandUseUseCase.execute();

    expect(dashboardRepositoryMock.getTotalLandUse).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('totalCultivableArea');
    expect(result).toHaveProperty('totalVegetationArea');
    expect(result.totalCultivableArea).toBe(350);
    expect(result.totalVegetationArea).toBe(150);
  });

  it('should throw an error if repository throws an error', async () => {
    dashboardRepositoryMock.getTotalLandUse.mockRejectedValue(new Error('Error message'));

    await expect(getTotalLandUseUseCase.execute()).rejects.toThrow('Error message');
  });
});
