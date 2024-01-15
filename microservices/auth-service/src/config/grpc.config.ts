import {
  ClientOptions,
  ClientProviderOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

const protoDir = join(__dirname, '/', 'proto');

export const grpcClientConfig: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    loader: {
      keepCase: true,
      longs: Number,
      enums: String,
      defaults: false,
      arrays: true,
      objects: true,
      includeDirs: [protoDir],
    },
    package: ['auth'],
    protoPath: [join(protoDir, '/auth.proto'), join(protoDir, '/user.proto')],
  },
};

export const grpcUserClientConfig: ClientProviderOptions = {
  name: 'USER_PACKAGE',
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: ['user'],
    protoPath: [join(protoDir, '/user.proto')],
  },
};
