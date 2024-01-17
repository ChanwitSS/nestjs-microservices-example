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
    findByText: jest.fn(),
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
      controller.findAll({});
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

  describe('#findByText', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findByText');
    });

    it('should be defined', () => {
      expect(service.findByText).toBeDefined();
    });

    it('should call service.findByText', () => {
      controller.findByText('searchText');
      expect(service.findByText).toHaveBeenCalledTimes(1);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      jest.spyOn(service, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call service.create', () => {
      controller.create({
        email: "test@gmail.com",
        password: "test"
      });
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      jest.spyOn(service, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call service.update', () => {
      const id = 'e165354e-cc07-44f4-9185-f79d39747485'
      controller.update(id, { });
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
