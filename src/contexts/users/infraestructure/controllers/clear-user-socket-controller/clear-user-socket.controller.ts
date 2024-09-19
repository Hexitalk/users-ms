import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { ClearUserSocketControllerDto } from './clear-user-socket-controller.dto';
import { ClearUserSocketIdUseCase } from 'src/contexts/users/application/use-cases';

@Controller('users')
export class ClearUserSocketController {
  constructor(
    private readonly clearUserSocketIdUseCase: ClearUserSocketIdUseCase,
  ) {}

  @MessagePattern({ cmd: 'users.clear-user-socket' })
  run(@Payload() payload: NatsPayloadInterface<ClearUserSocketControllerDto>) {
    const { data: clearUserSocketControllerDto, ...config } = payload;
    return this.clearUserSocketIdUseCase.run(
      clearUserSocketControllerDto.socketId,
      config,
    );
  }
}
