import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockSequelizeUsers = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findCreate: jest.fn(),
      findUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      //   providers: [
      //     {
      //       provide: 'UserRepository',
      //       useValue: mockSequelizeUsers,
      //     },
      //   ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
