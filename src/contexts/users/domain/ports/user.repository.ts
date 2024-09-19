import { UserModel } from '../models/user.model';

export abstract class UserRepository {
  abstract insert(user: UserModel): Promise<UserModel>;
  abstract update(user: UserModel): Promise<UserModel>;
  abstract delete(id: string): Promise<UserModel>;
  abstract findById(id: string): Promise<UserModel | null>;
  abstract findByEmail(email: string): Promise<UserModel | null>;
  abstract findListByIds(ids: string[]): Promise<UserModel[]>;
  abstract findBySocketId(socketId: string): Promise<UserModel>;
}
