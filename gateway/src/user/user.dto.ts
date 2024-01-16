import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @ApiProperty()
  password: string;
}
export class UpdateUserDto extends CreateUserDto {}

export class UserQueryDto {
  @ApiProperty({ required: false })
  take: number;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  sortField: string;
  @ApiProperty({ required: false })
  sortDirection: string;
  @ApiProperty({ required: false })
  search: string;
}
