import { APPCONSTANTS } from 'src/app.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: APPCONSTANTS.dbConnection,
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: '192.168.56.101',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db_url_shortener',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];