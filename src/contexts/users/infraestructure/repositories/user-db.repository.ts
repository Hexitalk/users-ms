import { UserRepository } from '../../domain/ports/user.repository';
import { UserModel, UserModelInterface } from '../../domain/models/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotFoundDatabaseException } from '../../domain/exceptions/database/not-found-database-exception';
import { FailSaveDatabaseException } from '../../domain/exceptions/database/fail-save-database-exception';
import { FailDeleteDatabaseException } from '../../domain/exceptions/database/fail-delete-database-exception';

@Injectable()
export class UserDbRepository extends UserRepository {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<UserModelInterface>,
  ) {
    super();
  }

  async insert(userEntity: UserModel): Promise<UserModel> {
    const user = new this.userModel(userEntity.toInterfaceDb());
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new FailSaveDatabaseException('user');
    }

    return UserModel.createFromDb(user.toObject());
  }

  async update(userEntity: UserModel): Promise<UserModel> {
    const user = userEntity.toInterfaceDb();
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        user,
        {
          new: true,
          upsert: false,
          useFindAndModify: false,
        },
      );

      return UserModel.createFromDb(updatedUser.toObject());
    } catch (error) {
      console.log(error);
      throw new FailSaveDatabaseException('user');
    }
  }

  async delete(id: string): Promise<UserModel> {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new FailDeleteDatabaseException('user');
    }

    return UserModel.createFromDb(user.toObject());
  }

  async findById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundDatabaseException('user');
    }

    return UserModel.createFromDb(user.toObject());
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundDatabaseException('user');
    }

    return UserModel.createFromDb(user.toObject());
  }

  async findListByIds(ids: string[]): Promise<UserModel[]> {
    const users = await this.userModel.find({ _id: { $in: ids } }).exec();

    return users.map((user) => UserModel.createFromDb(user.toObject()));
  }
}
