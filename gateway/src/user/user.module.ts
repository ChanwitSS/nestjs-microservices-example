import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { grpcUserClientConfig } from 'src/config/grpc.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    ClientsModule.register([grpcUserClientConfig]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
