import { Injectable, Inject, Scope } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TransactionManager {
  public queryRunner: QueryRunner | null = null;

  constructor(
    @Inject('DATA_SOURCE')
    public readonly dataSource: DataSource,
  ) {}

  private async initializeQueryRunner(): Promise<void> {
    if (!this.queryRunner) {
      this.queryRunner = this.dataSource.createQueryRunner();
      await this.queryRunner.connect();
    }
  }

  async startTransaction(): Promise<void> {
    await this.initializeQueryRunner();
    if (!this.queryRunner?.isTransactionActive) {
      await this.queryRunner.startTransaction();
    }
  }

  async commitTransaction(): Promise<void> {
    if (this.queryRunner && this.queryRunner.isTransactionActive) {
      await this.queryRunner.commitTransaction();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.queryRunner && this.queryRunner.isTransactionActive) {
      await this.queryRunner.rollbackTransaction();
    }
  }

  async release(): Promise<void> {
    if (this.queryRunner?.isReleased == true) {
      await this.queryRunner.release();
      this.queryRunner = null; // Reset queryRunner after release
    }
  }

  async getQueryRunner(): Promise<QueryRunner> {
    if (!this.queryRunner) {
      await this.initializeQueryRunner();
    }
    return this.queryRunner;
  }
}
