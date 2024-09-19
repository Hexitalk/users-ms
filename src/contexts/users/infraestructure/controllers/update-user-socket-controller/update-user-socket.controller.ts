import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { UpdateUserSocketControllerDto } from './update-user-socket-controller.dto';
import { UpdateUserSocketIdUseCase } from 'src/contexts/users/application/use-cases';

@Controller('users')
export class UpdateUserSocketController {
  constructor(
    private readonly updateUserSocketIdUseCase: UpdateUserSocketIdUseCase,
  ) {}

  @MessagePattern({ cmd: 'users.update-user-socket' })
  run(@Payload() payload: NatsPayloadInterface<UpdateUserSocketControllerDto>) {
    const { data: updateUserSocketControllerDto, ...config } = payload;
    return this.updateUserSocketIdUseCase.run(
      updateUserSocketControllerDto.id,
      updateUserSocketControllerDto.socketId,
      config,
    );
  }
}
