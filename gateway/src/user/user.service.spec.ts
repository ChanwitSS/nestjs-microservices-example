import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { encodePassword } from 'src/utils/password.util';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from './user.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
      //   providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
