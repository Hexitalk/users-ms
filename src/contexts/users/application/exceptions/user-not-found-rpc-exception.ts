import { RpcException } from '@nestjs/microservices';

export class UserNotFoundRpcException extends RpcException {
  constructor() {
    super({ status: 404, message: 'user.error.user-not-found' }); // i18n key
  }
}
