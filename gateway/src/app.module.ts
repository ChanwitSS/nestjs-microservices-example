import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services';
import { ClientsModule } from '@nestjs/microservices';
import { grpcUserClientConfig } from './config/grpc.config';

@Module({
  imports: [AuthModule, ClientsModule.register([grpcUserClientConfig])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
