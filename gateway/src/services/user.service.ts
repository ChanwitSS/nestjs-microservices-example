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
  private grpcUserClient: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcUserClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  async findAll({ take, page, sortField, sortDirection }) {
    return this.grpcUserClient.findAll({
      take,
      page,
      sortField,
      sortDirection,
    });
  }

  async findOne(id: string) {
    return this.grpcUserClient.findOne({ id });
  }

  async create(data: any) {
    return this.grpcUserClient.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.grpcUserClient.update({ id, data });
  }
}
