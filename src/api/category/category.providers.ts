import { Connection } from 'mongoose';
import { CategorySchema } from './category.schema';

export const categoryProviders = [
  {
    provide: 'category',
    useFactory: (connection: Connection) => connection.model('category', CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
