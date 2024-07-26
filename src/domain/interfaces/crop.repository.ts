import { Crop } from '../entities/crop';

export interface CropRepository {
  save(crop: Crop): Promise<void>;
  findById(id: string): Promise<Crop | undefined>;
  findByIds(ids: string[]): Promise<Crop[]>;
  findAll(): Promise<Crop[]>;
  delete(id: string): Promise<void>;
}
