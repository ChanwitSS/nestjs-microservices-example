import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { AuthService } from 'src/services';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(request: any, metadata: Metadata) {
    try {
      const user = await this.authService.register({ ...request });
      return {
        succesful: true,
        // data: user
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }

  @GrpcMethod('AuthService', 'Login')
  async login(request: any, metadata: Metadata) {
    try {
      const token = await this.authService.login({ ...request });
      console.log(token);
      return {
        succesful: true,
        token,
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }

  @GrpcMethod('AuthService', 'Validate')
  async validate(request: any, metadata: Metadata) {
    const { token } = request;
    try {
      const id = await this.authService.validate(token);

      return {
        succesful: true,
        id,
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }
}
