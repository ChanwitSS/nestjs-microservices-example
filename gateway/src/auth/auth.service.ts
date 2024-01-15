import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  ValidateResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './auth.pb';

@Injectable()
export class AuthService {
  private authServiceClient: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  register(body: RegisterRequest): Observable<RegisterResponse> {
    return this.authServiceClient.register(body);
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.authServiceClient.login(body);
  }

   async validate(token: string): Promise<ValidateResponse> {
    console.log(await firstValueFrom(this.authServiceClient.validate({ token })))
    return await firstValueFrom(this.authServiceClient.validate({ token }));
  }
}
