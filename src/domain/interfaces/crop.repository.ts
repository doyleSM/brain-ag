import { Crop } from '../entities/crop';

export interface CropRepository {
  save(crop: Crop): Promise<void>;
  findByIds(ids: string[]): Promise<Crop[]>;
  findAll(): Promise<Crop[]>;
}
