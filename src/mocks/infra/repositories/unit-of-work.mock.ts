import { mock, MockProxy } from 'jest-mock-extended';
import { CropRepository } from 'src/domain/interfaces/crop.repository';
import { FarmRepository } from 'src/domain/interfaces/farm.repository';
import { FarmerRepository } from 'src/domain/interfaces/farmer.repository';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';

export class UnitOfWorkMock implements UnitOfWork {
  public cropRepository: MockProxy<CropRepository> = mock<CropRepository>();
  public farmRepository: MockProxy<FarmRepository> = mock<FarmRepository>();
  public farmerRepository: MockProxy<FarmerRepository> = mock<FarmerRepository>();

  constructor(cropRepository: MockProxy<CropRepository>, farmRepository: MockProxy<FarmRepository>, farmerRepository: MockProxy<FarmerRepository>) {
    this.cropRepository = cropRepository;
    this.farmRepository = farmRepository;
    this.farmerRepository = farmerRepository;
  }

  async beginTransaction(): Promise<void> {
    return;
  }

  async commit(): Promise<void> {
    return;
  }

  async rollback(): Promise<void> {
    return;
  }

  async release(): Promise<void> {
    return;
  }
}
