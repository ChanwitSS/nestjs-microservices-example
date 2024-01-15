import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(request: any, metadata: Metadata): Promise<any> {
    const { id } = request;
    return this.userService.findOne(id);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll(request: any, metadata: Metadata): Promise<any> {
    const { take, page, sortField, sortDirection, filter } = request;
    return this.userService.findAll({ take, page, sortField, sortDirection });
  }

  @GrpcMethod('UserService', 'Create')
  create(request: any, metadata: Metadata): Promise<any> {
    return this.userService.create({ ...request });
  }

  @GrpcMethod('UserService', 'Update')
  update(request: any, metadata: Metadata): Promise<any> {
    const { id, body } = request;
    return this.userService.update(id, { ...body });
  }
}
