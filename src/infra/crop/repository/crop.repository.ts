import { Inject, Injectable, Scope } from '@nestjs/common';
import { Crop } from 'src/domain/entities/crop';
import { CropRepository } from 'src/domain/interfaces/crop.repository';
import { CropEntity } from 'src/infra/database/entities/crop.entity';
import { TransactionManager } from 'src/infra/database/transaction.manager';
import { In } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class CropRepositoryImpl implements CropRepository {
  constructor(
    @Inject('TRANSACTION_MANAGER')
    private readonly transactionManager: TransactionManager,
  ) {}

  async findByIds(ids: string[]): Promise<Crop[]> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();
    const result = await queryRunner.manager.findBy(CropEntity, { id: In(ids) });
    queryRunner.release();
    return result.map((crop) => new Crop(crop.name, crop.id));
  }

  async save(crop: Crop): Promise<void> {
    const queryRunner = await this.transactionManager.getQueryRunner();
    await queryRunner.manager.save(CropEntity, crop);
  }

  async findById(id: string): Promise<Crop | undefined> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();
    const result = await queryRunner.manager.findOneBy(CropEntity, { id });
    queryRunner.release();
    return result ? new Crop(result.name, result.id) : undefined;
  }

  async findAll(): Promise<Crop[]> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();
    const result = await queryRunner.manager.find(CropEntity);
    queryRunner.release();
    return result.map((crop) => new Crop(crop.name, crop.id));
  }

  async delete(id: string): Promise<void> {
    const queryRunner = await this.transactionManager.getQueryRunner();
    await queryRunner.manager.delete(CropEntity, id);
  }
}
