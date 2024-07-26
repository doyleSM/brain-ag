import { CropRepository } from './crop.repository';
import { FarmRepository } from './farm.repository';
import { FarmerRepository } from './farmer.repository';

export interface UnitOfWork {
  cropRepository: CropRepository;
  farmRepository: FarmRepository;
  farmerRepository: FarmerRepository;

  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;
}
