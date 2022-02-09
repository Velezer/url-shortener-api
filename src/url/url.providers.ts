import { Connection } from 'typeorm';
import { Url } from './entities/url.entity';
import { APPCONSTANTS } from '../app.constants';

export const urlProviders = [
    {
        provide: APPCONSTANTS.urlRepository,
        useFactory: (connection: Connection) => connection.getRepository(Url),
        inject: [APPCONSTANTS.dbConnection],
    },
];