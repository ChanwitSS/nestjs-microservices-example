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
