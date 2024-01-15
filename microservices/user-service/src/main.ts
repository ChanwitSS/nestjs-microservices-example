import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientConfig } from './config/grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>(grpcClientConfig)
  await app.startAllMicroservices()
  await app.init()
}
bootstrap();
