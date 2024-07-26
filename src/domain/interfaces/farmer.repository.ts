import { Farmer } from '../entities/farmer';

export interface FarmerRepository {
  save(farmer: Farmer): Promise<void>;
  findById(id: string): Promise<Farmer | undefined>;
  findAll(): Promise<Farmer[]>;
  delete(id: string): Promise<void>;
  findByCpfCnpj(cpfCnpj: string): Promise<Farmer | undefined>;
}
