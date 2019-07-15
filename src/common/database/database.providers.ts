import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service'; 

const config : ConfigService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>      
      await mongoose.connect(config.uri, { useNewUrlParser: true, useCreateIndex: true }),
  },
];

