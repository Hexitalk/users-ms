import * as mongoose from 'mongoose';
import { envs } from 'src/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(envs.databaseUrl),
  },
];

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: (): Promise<typeof mongoose> => {
//       console.log(envs.databaseUrl);
//       return mongoose.connect(
//         'mongodb+srv://hexitalk_db_user:MDOaVIU1LKRX85ZV@hexitalk.xceh6.mongodb.net/?retryWrites=true&w=majority&appName=hexitalk' /* , {
//         dbName: 'usersdb',
//         auth: {
//           username: 'mongo',
//           password: '123456',
//         },
//       }*/,
//       );
//     },
//   },
// ];
