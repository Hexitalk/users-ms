import { RpcException } from '@nestjs/microservices';

export class FailCreateUserRpcException extends RpcException {
  constructor() {
    super({ status: 404, message: 'user.error.fail-create-user' }); // i18n key
  }
}
