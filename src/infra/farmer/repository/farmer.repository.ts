import { Inject, Injectable, Scope } from '@nestjs/common';
import { Farmer } from 'src/domain/entities/farmer';
import { FarmerRepository } from 'src/domain/interfaces/farmer.repository';
import { FarmerEntity } from 'src/infra/database/entities/farmer.entity';
import { TransactionManager } from 'src/infra/database/transaction.manager';

@Injectable({ scope: Scope.REQUEST })
export class FarmerRepositoryImpl implements FarmerRepository {
  constructor(
    @Inject('TRANSACTION_MANAGER')
    private readonly transactionManager: TransactionManager,
  ) {}

  async save(farmer: Farmer): Promise<void> {
    const queryRunner = await this.transactionManager.getQueryRunner();
    await queryRunner.manager.save(FarmerEntity, farmer.toJson());
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Farmer | undefined> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();
    const result = await queryRunner.manager.findOneBy(FarmerEntity, { cpfCnpj });
    return result ? new Farmer(result.cpfCnpj, result.name, result.id) : undefined;
    // queryRunner.release();
  }
}
