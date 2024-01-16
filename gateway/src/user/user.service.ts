import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserServiceClient } from 'src/user/user.pb';
import { encodePassword } from 'src/utils/password.util';

@Injectable()
export class UserService {
  private userServiceClient: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  async findAll({ take, page, sortField, sortDirection, filter }) {
    return this.userServiceClient.findAll({
      take,
      page,
      sortField,
      sortDirection,
      filter,
    });
  }

  async findOne(id: string) {
    return this.userServiceClient.findOne({ id });
  }

  async create(data: any) {
    try {
      const { email, password } = data;
      const { data: user } = await firstValueFrom(
        this.userServiceClient.findOne({ email }),
      );

      if (user) throw new ConflictException('Email already exist!');

      const {  data: createdUser } = await firstValueFrom(
        this.userServiceClient.create({
          email,
          password: encodePassword(password),
        }),
      );

      if (createdUser)
        return {
          successful: true,
          data: createdUser,
        };
    } catch (err) {
      return {
        succdessful: false,
        err: err.message,
      };
    }
  }

  async update(id: string, data: any) {
    try {
      const { password } = data;
      const { data: user } = await firstValueFrom(
        this.userServiceClient.findOne({ id }),
      );

      if (!user) throw new ConflictException('user not found');

      const updatedUser = await firstValueFrom(
        this.userServiceClient.update({
          id,
          ...data,
          ...(password ? { password: encodePassword(password) } : {}),
        }),
      );
      console.log('asdja', updatedUser);
      return {
        successful: true,
        data: updatedUser.data,
      };
    } catch (err) {
      return {
        succdessful: false,
        err: err.message,
      };
    }
  }

  // async delete(id: string) {
  //   return this.userServiceClient.delete({ id });
  // }
}
