import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

import { UserModel } from 'src/contexts/users/domain/models/user.model';
import { UserRepository } from 'src/contexts/users/domain/ports/user.repository';
// import { FailSaveDatabaseException } from 'src/contexts/users/domain/exceptions/database/fail-save-database-exception';
import { FailCreateUserRpcException } from '../../exceptions/fail-create-user-rpc-exception';
// import { RpcException } from '@nestjs/microservices';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Inject } from '@nestjs/common';

@Injectable()
export class ClearUserSocketIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async run(
    socketId: string,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    console.log(socketId);

    const userResult: UserModel =
      await this.userRepository.findBySocketId(socketId);

    if (!userResult) {
      throw new FailCreateUserRpcException();
    }

    const userModelUpdate = UserModel.create({
      ...userResult.toInterface(),
      socket_id: '',
    });

    try {
      const updatedUser = await this.userRepository.update(userModelUpdate);

      const userInterface = updatedUser.toInterface();

      const payloadUpdateProfileOnlineStatus: NatsPayloadInterface<{
        user_id: string;
        online_status: boolean;
      }> = {
        ...config,
        authUserId: userInterface.id,
        data: { user_id: userInterface.id, online_status: false },
      };

      await firstValueFrom(
        this.client.send(
          { cmd: 'profiles.set-online-status' },
          payloadUpdateProfileOnlineStatus,
        ),
        { defaultValue: void 0 },
      );
    } catch (error) {
      throw new FailCreateUserRpcException();
    }
  }
}
