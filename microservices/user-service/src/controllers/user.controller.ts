import { Metadata } from '@grpc/grpc-js';
import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindAll')
  async findAll(request: any, metadata: Metadata) {
    const { take, page, sortField, sortDirection, filter } = request;

    try {
      const users = await this.userService.findAll({
        take,
        page,
        sortField,
        sortDirection,
        filter,
      });

      return {
        successful: true,
        data: users,
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(request: any, metadata: Metadata) {
    try {
      const user = await this.userService.findOne({ ...request });

      return {
        successful: true,
        data: user,
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }

  @GrpcMethod('UserService', 'Create')
  async create(request: any, metadata: Metadata) {
    try {
      const user = await this.userService.create({ ...request });

      return {
        successful: true,
        data: user,
      };
    } catch (err) {
      console.log(err)
      return {
        successful: false,
        error: err,
      };
    }
  }

  @GrpcMethod('UserService', 'Update')
  async update(request: any, metadata: Metadata) {
    const { id } = request;
    try {
      const user = await this.userService.update(id, { ...request });
      console.log(user)
      return {
        successful: true,
        data: user,
      };
    } catch (err) {
      return {
        successful: false,
        error: err,
      };
    }
  }
}
