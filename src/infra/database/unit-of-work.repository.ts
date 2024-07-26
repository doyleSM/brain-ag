import { Inject, Injectable } from '@nestjs/common';
import { CropRepository } from 'src/domain/interfaces/crop.repository';
import { FarmRepository } from 'src/domain/interfaces/farm.repository';
import { FarmerRepository } from 'src/domain/interfaces/farmer.repository';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';
import { CropRepositoryImpl } from 'src/infra/crop/repository/crop.repository';
import { FarmerRepositoryImpl } from 'src/infra/farmer/repository/farmer.repository';
import { FarmRepositoryImpl } from '../farm/repository/farm.repository';
import { TransactionManager } from './transaction.manager';

@Injectable()
export class UnitOfWorkImpl implements UnitOfWork {
  constructor(
    @Inject('TRANSACTION_MANAGER')
    private readonly transactionManager: TransactionManager,

    @Inject(CropRepositoryImpl)
    public cropRepository: CropRepository,
    @Inject(FarmRepositoryImpl)
    public farmRepository: FarmRepository,
    @Inject(FarmerRepositoryImpl)
    public farmerRepository: FarmerRepository,
  ) {}

  async beginTransaction(): Promise<void> {
    await this.transactionManager.startTransaction();
  }

  async commit(): Promise<void> {
    await this.transactionManager.commitTransaction();
    await this.release();
  }

  async rollback(): Promise<void> {
    await this.transactionManager.rollbackTransaction();
    await this.release();
  }

  async release(): Promise<void> {
    await this.transactionManager.release();
  }
}
