import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { SetProfileIdUserControllerDto } from './set-profile-id-user-controller.dto';
import { SetProfileIdUserUseCase } from 'src/contexts/users/application/use-cases/set-profile-id-user-use-case/set-profile-id-user-use-case';

@Controller('users')
export class SetProfileIdUserController {
  constructor(
    private readonly updateProfileIdUserUseCase: SetProfileIdUserUseCase,
  ) {}

  @MessagePattern({ cmd: 'users.set-profile-id-user' })
  run(@Payload() payload: NatsPayloadInterface<SetProfileIdUserControllerDto>) {
    const { data: setProfileIdUserControllerDto, ...config } = payload;
    return this.updateProfileIdUserUseCase.run(
      setProfileIdUserControllerDto.profile_id,
      config,
    );
  }
}
