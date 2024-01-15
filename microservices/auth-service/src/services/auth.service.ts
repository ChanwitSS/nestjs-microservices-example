import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ClientGrpc } from '@nestjs/microservices';
import { User, UserServiceClient } from 'src/pb';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';

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

  public async validateUser({ id }): Promise<any> {
    return await firstValueFrom(this.userServiceClient.findOne({ id }));
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  async validate(token: string): Promise<any> {
    const decoded = await this.jwtService.verify(token);
    if (!decoded) throw new UnauthorizedException('Invalid Token!');
    const auth = await this.validateUser(decoded);
    if (!auth) throw new ConflictException('User not found!');

    return decoded.id;
  }

  async register(data: User): Promise<any> {
    const { email, password } = data;
    const { data: user } = await firstValueFrom(
      this.userServiceClient.findOne({ email }),
    );
    if (user) throw new ConflictException('Email already exist!');

    try {
      const createdUser = await firstValueFrom(
        this.userServiceClient.create({
          data: {
            email,
            password: this.encodePassword(password),
          },
        }),
      );

      return createdUser;
    } catch (err) {
      return err;
    }
  }

  async login({ email, password }) {
    try {
      const { data: user } = await firstValueFrom(
        this.userServiceClient.findOne({ email }),
      );

      if (this.isPasswordValid(password, user.password))
        return this.jwtService.generateToken({
          id: user.id,
          email: user.email,
        });
    } catch (err) {
      return err;
    }
  }
}
