import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/contexts/shared/database/database.module';
import { NatsModule } from 'src/contexts/shared/nats/nats.module';
import { usersMongoProviders } from './mongo/providers/users.mongo.providers';
import { UserDbRepository } from './repositories/user-db.repository';
import { UserRepository } from '../domain/ports/user.repository';
import * as path from 'path';
import * as useCases from '../application/use-cases/index';
import * as controllers from './controllers/';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from '../../shared/interceptors/rpc-exception-translate.interceptor';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { NatsLanguageResolver } from '../../shared/i18n-resolvers/nats-language.resolver';

@Module({
  imports: [
    NatsModule,
    DatabaseModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        loader: I18nJsonLoader,
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: NatsLanguageResolver, options: {} }],
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...usersMongoProviders,
    ...Object.values(useCases),
    UserDbRepository,
    {
      provide: UserRepository,
      useExisting: UserDbRepository,
    },
    NatsLanguageResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
  ],
  exports: [
    ...Object.values(useCases),
    UserDbRepository,
    {
      provide: UserRepository,
      useExisting: UserDbRepository,
    },
  ],
})
export class UsersModule {}
