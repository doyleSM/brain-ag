import { DataSource, DataSourceOptions } from 'typeorm';
import { Provider, Scope } from '@nestjs/common';
import { DataType, newDb } from 'pg-mem';
import { TransactionManager } from '../transaction.manager';

export const testDatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const db = newDb({
        autoCreateForeignKeyIndices: true,
      });

      db.public.registerFunction({
        implementation: () => 'test',
        name: 'current_database',
      });

      // register version
      db.public.registerFunction({
        implementation: () => '13.3',
        name: 'version',
      });

      db.public.interceptQueries((queryText) => {
        if (queryText.search(/(pg_views|pg_matviews|pg_tables|pg_enum)/g) > -1) {
          return [];
        }
        return null;
      });

      db.public.registerFunction({
        name: 'jsonb_typeof',
        args: [DataType.jsonb],
        returns: DataType.text,
        implementation: (x) => (x ? x.constructor.name : null),
      });

      db.public.registerFunction({
        name: 'obj_description',
        args: [DataType.text, DataType.text],
        returns: DataType.text,
        implementation: () => 'test',
      });

      // Cria a conexão com o pg-mem
      const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'testdb',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        dropSchema: true,
      };

      const dataSource = await db.adapters.createTypeormDataSource(dataSourceOptions);

      await dataSource.initialize();

      return dataSource;
    },
  },
  {
    provide: 'TRANSACTION_MANAGER',
    useFactory: (dataSource: DataSource) => new TransactionManager(dataSource),
    inject: ['DATA_SOURCE'],
    scope: Scope.REQUEST,
  },
] as Provider[];
