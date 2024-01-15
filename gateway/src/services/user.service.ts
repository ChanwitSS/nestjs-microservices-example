import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/pb/user.pb';

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
    return this.userServiceClient.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.userServiceClient.update({ id, data });
  }

  async delete(id: string) {
    return this.userServiceClient.delete({ id });
  }
}
