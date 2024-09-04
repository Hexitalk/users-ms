import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserRepository } from '../../../domain/ports/user.repository';
import {
  UserModel,
  UserModelInterface,
} from '../../../domain/models/user.model';
import { FindListUserByIdsDto } from './find-list-user-by-ids.dto';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';

@Injectable()
export class FindListUserByIdsUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    dto: FindListUserByIdsDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ users: UserModelInterface[] }> {
    const users: UserModel[] = await this.userRepository.findListByIds(dto.ids);

    return {
      users: users.map((e) => e.toInterface()),
    };
  }
}
