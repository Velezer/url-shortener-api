import { APPCONSTANTS } from 'src/app.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: APPCONSTANTS.dbConnection,
    useFactory: async () => await createConnection({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];