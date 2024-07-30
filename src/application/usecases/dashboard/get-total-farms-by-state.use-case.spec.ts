import { dashboardRepositoryMock } from 'src/mocks/infra/repositories/dashboard.repository.mock';
import { GetTotalFarmsByStateUseCase } from './get-total-farms-by-state.use-case';

describe('GetTotalFarmsByStateUseCase', () => {
  let getTotalFarmsByStateUseCase: GetTotalFarmsByStateUseCase;

  beforeEach(() => {
    getTotalFarmsByStateUseCase = new GetTotalFarmsByStateUseCase(dashboardRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should total farms by state properly', async () => {
    dashboardRepositoryMock.getTotalFarmByState.mockResolvedValue([
      {
        state: 'MG',
        totalFarms: 10,
      },
      {
        state: 'SP',
        totalFarms: 20,
      },
      {
        state: 'RJ',
        totalFarms: 30,
      },
      {
        state: 'ES',
        totalFarms: 40,
      },
      {
        state: 'BA',
        totalFarms: 50,
      },
    ]);

    const result = await getTotalFarmsByStateUseCase.execute();

    expect(dashboardRepositoryMock.getTotalFarmByState).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Array));
    expect(result[0]).toHaveProperty('state');
    expect(result[0]).toHaveProperty('totalFarms');
    expect(result.length).toBe(5);
  });

  it('should throw an error if repository throws an error', async () => {
    dashboardRepositoryMock.getTotalFarmByState.mockRejectedValue(new Error('Error message'));

    await expect(getTotalFarmsByStateUseCase.execute()).rejects.toThrow('Error message');
  });
});
