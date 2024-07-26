import { Inject, Injectable, Scope } from '@nestjs/common';
import { Farm } from 'src/domain/entities/farm';
import { FarmRepository } from 'src/domain/interfaces/farm.repository';
import { FarmEntity } from 'src/infra/database/entities/farm.entity';
import { TransactionManager } from 'src/infra/database/transaction.manager';

@Injectable({ scope: Scope.REQUEST })
export class FarmRepositoryImpl implements FarmRepository {
  constructor(
    @Inject('TRANSACTION_MANAGER')
    private readonly transactionManager: TransactionManager,
  ) {}

  async save(farm: Farm): Promise<void> {
    const queryRunner = await this.transactionManager.getQueryRunner();
    const result = await queryRunner.manager.save(FarmEntity, farm.toJson());
    console.log(result);
  }

  async findById(id: string): Promise<Farm | undefined> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();

    const result = await queryRunner.manager.findOneBy(FarmEntity, {
      id,
    });
    queryRunner.release();

    return new Farm(
      result.name,
      result.city,
      result.state,
      result.totalAreaHectares,
      result.cultivableAreaHectares,
      result.vegetationAreaHectares,
      result.id,
    );
  }
  async findAll(): Promise<Farm[]> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();

    const result = await queryRunner.manager.find(FarmEntity);
    queryRunner.release();
    return result.map((farm) => {
      return new Farm(farm.name, farm.city, farm.state, farm.totalAreaHectares, farm.cultivableAreaHectares, farm.vegetationAreaHectares, farm.id);
    });
  }
  async delete(id: string): Promise<void> {
    const queryRunner = await this.transactionManager.getQueryRunner();

    await queryRunner.manager.delete(FarmEntity, id);
  }
}
