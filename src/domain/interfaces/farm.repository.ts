import { Farm } from '../entities/farm';

export interface FarmRepository {
  save(farm: Farm): Promise<void>;
  findById(id: string): Promise<Farm | undefined>;
  findAll(): Promise<Farm[]>;
  delete(id: string): Promise<void>;
}
