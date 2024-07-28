import { Inject, Injectable, Scope } from '@nestjs/common';
import { Crop } from 'src/domain/entities/crop';
import { Farm } from 'src/domain/entities/farm';
import { Farmer } from 'src/domain/entities/farmer';
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
    await queryRunner.manager.save(FarmEntity, farm.toJson());
  }

  async findById(id: string): Promise<Farm | undefined> {
    const queryRunner = this.transactionManager.dataSource.createQueryRunner();

    const result = await queryRunner.manager.findOne(FarmEntity, {
      where: {
        id,
      },
      relations: ['farmer', 'crops'],
    });
    queryRunner.release();

    if (!result) {
      return undefined;
    }
    const crops = result.crops.map((crop) => {
      return new Crop(crop.name, crop.id);
    });

    const farmer = new Farmer(result.farmer.cpfCnpj, result.farmer.name, result.farmer.id);

    const farm = new Farm(
      result.name,
      result.city,
      result.state,
      Number(result.totalAreaHectares),
      Number(result.cultivableAreaHectares),
      Number(result.vegetationAreaHectares),
      result.id,
    );

    farm.addCrops(crops);
    farm.farmer = farmer;
    return farm;
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
