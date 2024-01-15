import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/pb';

@Injectable()
export class AuthService {
  private grpcUserClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.grpcUserClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  async validate(token: string): Promise<any> {
    const decoded = await this.jwtService.verify(token);
    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const auth = await this.jwtService.validateUser(decoded);
    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }

  public async register({ email, password }: any): Promise<any> {
    const user = this.grpcUserClient.findOne({ email });

    if (user) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    try {
      // await this.repository.save({
      //   email,
      //   password: this.jwtService.encodePassword(password)
      // });
      const craeted = this.grpcUserClient.create({
        email,
        password: this.jwtService.encodePassword(password),
      });
    } catch (err) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [...err] };
    }

    return { status: HttpStatus.CREATED, error: null };
  }

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.client.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return result;
  // }
  // async register(username: string, password: string): Promise<any> {
  //   const payload = { sub: user.userId, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
