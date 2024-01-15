import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService as Jwt } from '@nestjs/jwt';
import { AuthDto } from 'src/dto/auth.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/pb';

@Injectable()
export class JwtService {
  private readonly jwt: Jwt;
  private grpcUserClient: UserServiceClient;

  constructor(
    jwt: Jwt,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {
    this.jwt = jwt;
  }

  onModuleInit() {
    this.grpcUserClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser({ id }): Promise<AuthDto> {
    return this.grpcUserClient.findOne({ id });
  }

  // Generate JWT Token
  public generateToken({ id, email }): string {
    return this.jwt.sign({ id, email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}
