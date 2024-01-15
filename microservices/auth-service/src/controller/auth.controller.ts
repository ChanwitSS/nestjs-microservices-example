import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { AuthService } from 'src/services';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(request: any, metadata: Metadata): Promise<any> {
    this.authService.register({ ...request });

    return {
      status: 200,
      error: null,
    };
  }
}
