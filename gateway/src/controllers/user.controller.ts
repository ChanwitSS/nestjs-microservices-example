import { Metadata } from '@grpc/grpc-js';
import { Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query() query: any): Promise<any> {
    const { take, page, sortField, sortDirection, filter } = query;
    return this.userService.findAll({
      take: +take,
      page: +page,
      sortField,
      sortDirection,
      filter,
    });
  }

  @Get(':id')
  findOne(request: any, metadata: Metadata): Promise<any> {
    const { id } = request;
    return this.userService.findOne(id);
  }

  @Post()
  create(request: any, metadata: Metadata): Promise<any> {
    return this.userService.create({ ...request });
  }

  @Put()
  update(request: any, metadata: Metadata): Promise<any> {
    const { id, body } = request;
    return this.userService.update(id, { ...body });
  }
}
