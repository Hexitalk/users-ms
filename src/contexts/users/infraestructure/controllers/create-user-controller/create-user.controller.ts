import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserUseCase } from '../../../application/use-cases/create-user-use-case/create-user-use-case';
import { CreateUserControllerDto } from './create-user-controller.dto';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @MessagePattern({ cmd: 'users.create-user' })
  run(@Payload() payload: NatsPayloadInterface<CreateUserControllerDto>) {
    const { data: createUserDto, ...config } = payload;
    return this.createUserUseCase.run(createUserDto, config);
  }
}
