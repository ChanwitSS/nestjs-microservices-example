import { Expose } from 'class-transformer';
import { PageDto } from './pagination.dto';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  password: string;
}

export class UsersDto extends PageDto {
  @Expose()
  users: UserDto[];
}

// export class CreateUserDto  {}
