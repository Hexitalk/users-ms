import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { FindUserByEmailUseCase } from 'src/contexts/users/application/use-cases';

@Controller('users')
export class FindUserByEmailController {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  @MessagePattern({ cmd: 'users.find-user-by-email' })
  run(@Payload() payload: NatsPayloadInterface<string>) {
    const { data: email, ...config } = payload;
    return this.findUserByEmailUseCase.run(email, config);
  }
}
