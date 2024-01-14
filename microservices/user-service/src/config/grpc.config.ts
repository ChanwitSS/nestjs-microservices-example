import { ClientOptions, Transport } from '@nestjs/microservices';
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
    package: ['user'],
    protoPath: [join(protoDir, '/user.proto')],
  },
};