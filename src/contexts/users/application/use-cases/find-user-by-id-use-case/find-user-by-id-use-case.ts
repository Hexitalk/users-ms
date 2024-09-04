import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserRepository } from '../../../domain/ports/user.repository';
import {
  UserModel,
  UserModelInterface,
} from '../../../domain/models/user.model';
import { FindUserByIdDto } from './find-user-by-id.dto';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    dto: FindUserByIdDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ user: UserModelInterface | null }> {
    const user: UserModel | null = await this.userRepository.findById(dto.id);

    return {
      user: user ? user.toInterface() : null,
    };
  }
}
