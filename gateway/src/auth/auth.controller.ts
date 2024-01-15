import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('test')
  test() {
    return this.authService.test();
  }

  //   @Post('register')
  //   async register(
  //     @Body() body: RegisterRequest,
  //   ): Promise<Observable<RegisterResponse>> {
  //     return this.svc.register(body);
  //   }

  //   @Put('login')
  //   async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
  //     return this.svc.login(body);
  //   }
}
