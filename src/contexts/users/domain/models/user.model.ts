export interface UserModelInterface {
  id?: string;
  email?: string;
  password?: string;
  profile_id?: string;
  socket_id?: string;
}

export interface UserModelInterfaceDB {
  _id?: string;
  email?: string;
  password?: string;
  profile_id?: string;
  socket_id?: string;
}

export class UserModel {
  private constructor(private attributes: UserModelInterface) {}

  static create(attributes: Partial<UserModelInterface>): UserModel {
    return new UserModel({
      id: attributes.id ?? undefined,
      email: attributes.email ?? '',
      password: attributes.password ?? '',
      profile_id: attributes.profile_id ?? undefined,
      socket_id: attributes.socket_id ?? '',
    });
  }

  static createFromDb(attributes: Partial<UserModelInterfaceDB>): UserModel {
    return new UserModel({
      id: attributes._id ?? undefined,
      email: attributes.email ?? '',
      password: attributes.password ?? '',
      profile_id: attributes.profile_id ?? undefined,
      socket_id: attributes.socket_id ?? '',
    });
  }

  toInterface(): UserModelInterface {
    return { ...this.attributes };
  }

  toInterfaceDb(): UserModelInterfaceDB {
    return { _id: this.attributes.id, ...this.attributes };
  }
}
