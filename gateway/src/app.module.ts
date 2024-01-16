import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { grpcUserClientConfig } from './config/grpc.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClientsModule.register([grpcUserClientConfig]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
