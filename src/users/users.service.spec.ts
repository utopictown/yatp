import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const user = { username: 'john' } as User;
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne('john');

      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'john' });
      expect(result).toEqual(user);
    });

    it('should return undefined when user is not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(undefined);

      const result = await service.findOne('john');

      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'john' });
      expect(result).toBeUndefined();
    });
  });
});
