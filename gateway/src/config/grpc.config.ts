import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const protoDir = join(__dirname, '/', 'proto');

// export const grpcAuthClientConfig: ClientProviderOptions = {
//   name: 'AUTH_PACKAGE',
//   transport: Transport.GRPC,
//   options: {
//     url: '0.0.0.0:50051',
//     package: ['auth'],
//     protoPath: [join(protoDir, '/auth.proto')],
//   },
// };

export const grpcUserClientConfig: ClientProviderOptions = {
  name: 'USER_PACKAGE',
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_SERVICE_URL || '0.0.0.0:50052',
    package: ['user'],
    protoPath: [join(protoDir, '/user.proto')],
  },
};
