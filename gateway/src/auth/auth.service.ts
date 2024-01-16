import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from './jwt.service';
import { encodePassword, isPasswordValid } from 'src/utils/password.util';
import { User, UserServiceClient } from 'src/user/user.pb';

@Injectable()
export class AuthService {
  private userServiceClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  public async validateUser({ id }) {
    return await firstValueFrom(this.userServiceClient.findOne({ id }));
  }

  async validate(token: string) {
    const decoded = await this.jwtService.verify(token);
    if (!decoded) throw new UnauthorizedException('Invalid Token!');
    const auth = await this.validateUser(decoded);
    if (!auth) throw new ConflictException('User not found!');

    return decoded.id;
  }

  async register(data: User) {
    try {
      const { email, password } = data;
      const { data: user } = await firstValueFrom(
        this.userServiceClient.findOne({ email }),
      );

      if (user) throw new ConflictException('Email already exist!');

      const createdUser = await firstValueFrom(
        this.userServiceClient.create({
          email,
          password: encodePassword(password),
        }),
      );

      return {
        successful: true,
        data: createdUser.data,
        token: this.jwtService.generateToken({
          id: createdUser.data.id,
          email: createdUser.data.email,
        }),
      };
    } catch (err) {
      return {
        succdessful: false,
        err: err.message,
      };
    }
  }

  async login({ email, password }) {
    try {
      const { data: user } = await firstValueFrom(
        this.userServiceClient.findOne({ email }),
      );

      if (user && isPasswordValid(password, user.password)) {
        return {
          successful: true,
          token: this.jwtService.generateToken({
            id: user.id,
            email: user.email,
          }),
        };
      } else {
        throw new BadRequestException('Not found!');
      }
    } catch (err) {
      return {
        successful: false,
        err: err.message,
      };
    }
  }
}
