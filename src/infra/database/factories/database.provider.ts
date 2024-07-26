import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TransactionManager } from '../transaction.manager';
import { Provider, Scope } from '@nestjs/common';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
  {
    provide: 'TRANSACTION_MANAGER',
    useFactory: (dataSource: DataSource) => new TransactionManager(dataSource),
    inject: ['DATA_SOURCE'],
    scope: Scope.REQUEST,
  },
] as Provider[];
