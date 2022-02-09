import { APPCONSTANTS } from 'src/app.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: APPCONSTANTS.dbConnection,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_url_shortener',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];