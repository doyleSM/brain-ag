import { Farmer } from '../entities/farmer';

export interface FarmerRepository {
  save(farmer: Farmer): Promise<void>;
  findByCpfCnpj(cpfCnpj: string): Promise<Farmer | undefined>;
}
