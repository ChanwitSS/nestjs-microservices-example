import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { encodePassword, isPasswordValid } from 'src/utils/password.util';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    // delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#findAll', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll');
    });

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call service.findAll', () => {
      // controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findOne');
    });

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call service.findOne', () => {
      const id = 'e165354e-cc07-44f4-9185-f79d39747485'
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
