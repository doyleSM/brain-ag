import { dashboardRepositoryMock } from 'src/mocks/infra/repositories/dashboard.repository.mock';
import { GetTotalFarmsUseCase } from './get-total-farms.use-case';

describe('GetTotalFarmsUseCase', () => {
  let getTotalFarmsUseCase: GetTotalFarmsUseCase;

  beforeEach(() => {
    getTotalFarmsUseCase = new GetTotalFarmsUseCase(dashboardRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total farms properly', async () => {
    dashboardRepositoryMock.getTotalFarms.mockResolvedValue({
      totalFarms: 500,
    });

    const result = await getTotalFarmsUseCase.execute();

    expect(dashboardRepositoryMock.getTotalFarms).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('totalFarms');
    expect(result.totalFarms).toBe(500);
  });

  it('should throw an error if repository throws an error', async () => {
    dashboardRepositoryMock.getTotalFarms.mockRejectedValue(new Error('Error message'));

    await expect(getTotalFarmsUseCase.execute()).rejects.toThrow('Error message');
  });
});
