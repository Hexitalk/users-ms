import { Module } from '@nestjs/common';
import { UsersModule } from 'src/contexts/users/infraestructure/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
