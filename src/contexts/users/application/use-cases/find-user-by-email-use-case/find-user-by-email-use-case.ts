import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserRepository } from '../../../domain/ports/user.repository';
import { UserModelInterface } from '../../../domain/models/user.model';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    email: string,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ user: UserModelInterface | null }> {
    const user = await this.userRepository.findByEmail(email);

    return {
      user: user ? user.toInterface() : null,
    };
  }
}
