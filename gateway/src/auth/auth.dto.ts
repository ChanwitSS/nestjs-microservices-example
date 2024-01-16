import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginDto {
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  password: string;
}