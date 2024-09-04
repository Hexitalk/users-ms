import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserRepository } from '../../../domain/ports/user.repository';
import { DeleteUserDto } from './delete-user.dto';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    dto: DeleteUserDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ success: boolean }> {
    await this.userRepository.delete(dto.id);

    return {
      success: true,
    };
  }
}
