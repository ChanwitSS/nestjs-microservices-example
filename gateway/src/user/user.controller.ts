import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto, CreateUserDto, UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query() query: any) {
    const { take, page, sortField, sortDirection, filter } = query;
    return this.userService.findAll({
      take: +take,
      page: +page,
      sortField,
      sortDirection,
      filter,
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create({ ...body });
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, { ...body });
  }
}
