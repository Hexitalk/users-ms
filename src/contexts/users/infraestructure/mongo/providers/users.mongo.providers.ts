import { Connection } from 'mongoose';
import UserMongoSchema from '../schemas/user.mongo.schema';
export const usersMongoProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserMongoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
