import { Inject, Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { AuthDto } from 'src/dto/auth.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/pb';

@Injectable()
export class JwtService {
  private readonly jwt: Jwt;
  private userServiceClient: UserServiceClient;

  constructor(
    jwt: Jwt,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {
    this.jwt = jwt;
  }

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Generate JWT Token
  public generateToken({ id, email }): string {
    return this.jwt.sign({ id, email });
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}
