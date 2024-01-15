import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { grpcUserClientConfig } from './config/grpc.config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig, jwtConstants } from './config/auth.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    ClientsModule.register([grpcUserClientConfig]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
