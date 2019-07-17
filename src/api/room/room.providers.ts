import { Connection } from 'mongoose';
import { RoomSchema } from './room.schema';

export const roomProviders = [
  {
    provide: 'room',
    useFactory: (connection: Connection) => connection.model('room', RoomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
