import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

import {
  UserModel,
  UserModelInterface,
} from 'src/contexts/users/domain/models/user.model';
import { UserRepository } from 'src/contexts/users/domain/ports/user.repository';
// import { FailSaveDatabaseException } from 'src/contexts/users/domain/exceptions/database/fail-save-database-exception';
import { FailCreateUserRpcException } from '../../exceptions/fail-create-user-rpc-exception';
// import { RpcException } from '@nestjs/microservices';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';

@Injectable()
export class SetProfileIdUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    profileId: string,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ user: UserModelInterface }> {
    const userResult: UserModel = await this.userRepository.findById(
      config.authUserId,
    );

    if (!userResult) {
      throw new FailCreateUserRpcException();
    }

    /* const userModel: UserModel = UserModel.create({
      ...userResult.toInterface(),
      profile_id: profileId,
    }); */
    // userResult.toInterface().profile_id = profileId;

    const userModelUpdate = UserModel.create({
      ...userResult.toInterface(),
      profile_id: profileId,
    });

    let responseUser: UserModelInterface;

    try {
      const resQuery = await this.userRepository.update(userModelUpdate);
      responseUser = resQuery.toInterface();
    } catch (error) {
      throw new FailCreateUserRpcException();
    }

    // const { password: __, ...userSafe } = responseUser;
    delete responseUser.password;

    return {
      user: responseUser,
    };
  }
}
