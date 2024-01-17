import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { encodePassword, isPasswordValid } from 'src/utils/password.util';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    validate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#register', () => {
    beforeEach(() => {
      jest.spyOn(service, 'register').mockImplementation();
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

    it('should call service.login', async () => {
      await controller.login({ email: 'test@gmail.com', password: 'password' })
      expect(service.login).toHaveBeenCalledTimes(1);
    });
  });
});
