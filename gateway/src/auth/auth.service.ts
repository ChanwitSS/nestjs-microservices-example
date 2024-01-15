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

  @Inject('AUTH_PACKAGE')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  test() {
    const res = this.authServiceClient.register({
      email: 'tan',
      password: 'tan',
    });
    console.log('here ', res);
    return res;
  }

  async register(body: RegisterRequest): Promise<Observable<RegisterResponse>> {
    return this.authServiceClient.register(body);
  }

  async login(body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.authServiceClient.login(body);
  }

  async validate(token: string): Promise<ValidateResponse> {
    const res = this.authServiceClient.validate({ token });
    console.log(res);
    return firstValueFrom(this.authServiceClient.validate({ token }));
  }
}
