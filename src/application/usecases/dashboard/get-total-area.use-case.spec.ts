import { GetTotalAreaUseCase } from './get-total-area.use-case';
import { dashboardRepositoryMock } from 'src/mocks/infra/repositories/dashboard.repository.mock';

describe('GetTotalAreaUseCase', () => {
  let getTotalAreaUseCase: GetTotalAreaUseCase;

  beforeEach(() => {
    getTotalAreaUseCase = new GetTotalAreaUseCase(dashboardRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get total area properly', async () => {
    dashboardRepositoryMock.getTotalArea.mockResolvedValue({ totalArea: 1000 });

    const result = await getTotalAreaUseCase.execute();

    expect(dashboardRepositoryMock.getTotalArea).toHaveBeenCalled();
    expect(result).toEqual(expect.any(Object));
    expect(result).toHaveProperty('totalArea');
    expect(result.totalArea).toEqual(1000);
  });

  it('should throw an error if getTotalArea throws an error', async () => {
    dashboardRepositoryMock.getTotalArea.mockRejectedValue(new Error('Error message'));

    await expect(getTotalAreaUseCase.execute()).rejects.toThrow('Error message');
  });
});
