import { Document } from 'mongoose';

export interface UserMongoEntity extends Document {
  readonly id: string;
  email: string;
  password: string;
  profile_id: string;
  socket_id: string;
}
