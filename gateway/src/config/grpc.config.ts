import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const protoDir = join(__dirname, '/', 'proto');

export const grpcAuthClientConfig: ClientProviderOptions = {
  name: 'AUTH_PACKAGE',
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: ['auth'],
    protoPath: [join(protoDir, '/auth.proto')],
  },
};
