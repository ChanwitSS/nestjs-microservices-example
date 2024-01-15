import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { grpcAuthClientConfig } from 'src/config/grpc.config';

@Module({
  imports: [ClientsModule.register([grpcAuthClientConfig])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
