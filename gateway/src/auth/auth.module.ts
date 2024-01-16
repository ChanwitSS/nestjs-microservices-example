import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { grpcUserClientConfig } from 'src/config/grpc.config';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    ClientsModule.register([grpcUserClientConfig]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
