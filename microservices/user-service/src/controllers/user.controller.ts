import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(request: any, metadata: Metadata): Promise<any> {
    const { userId } = request;
    return this.userService.findOne(userId);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll(request: any, metadata: Metadata): Promise<any> {
    const { take, page, sortField, sortDirection } = request;
    return this.userService.findAll({ take, page, sortField, sortDirection });
  }
}
