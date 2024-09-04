import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

import { CreateUserDto } from './create-user.dto';
import {
  UserModel,
  UserModelInterface,
} from 'src/contexts/users/domain/models/user.model';
import { UserRepository } from 'src/contexts/users/domain/ports/user.repository';
import { FailSaveDatabaseException } from 'src/contexts/users/domain/exceptions/database/fail-save-database-exception';
import { FailCreateUserRpcException } from '../../exceptions/fail-create-user-rpc-exception';
import { RpcException } from '@nestjs/microservices';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    dto: CreateUserDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ user: UserModelInterface }> {
    const userModel = UserModel.create(dto);
    let responseUser: UserModelInterface;

    try {
      const resQuery = await this.userRepository.insert(userModel);
      responseUser = resQuery.toInterface();
    } catch (error) {
      if (error instanceof FailSaveDatabaseException) {
        throw new FailCreateUserRpcException();
      }
      throw new RpcException('error');
    }

    return {
      user: responseUser,
    };
  }
}
