import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
      providers: [UserService],
      controllers: [UserController],
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

  describe('#register', () => {
    beforeEach(() => {
      jest.spyOn(service, 'register');
    });

    it('should be defined', () => {
      expect(service.register).toBeDefined();
    });

    it('should call service.register', () => {
      controller.register({ email: 'test@gmail.com', password: 'password' });
      expect(service.register).toHaveBeenCalledTimes(1);
    });
  });

  describe('#login', () => {
    beforeEach(() => {
      jest.spyOn(service, 'login');
    });

    it('should be defined', () => {
      expect(service.login).toBeDefined();
    });

    it('should call service.get', () => {
      controller.login({ email: 'test@gmail.com', password: 'password' });
      expect(service.login).toHaveBeenCalledTimes(1);
    });
  });
});
