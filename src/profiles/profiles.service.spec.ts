import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model, Query } from 'mongoose';
import { ProfilesService } from './profiles.service';
import { Profile } from './schemas/profile.schema';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let profileModel: Model<Profile>;
  let usersService: UsersService;

  const profileId = new mongoose.Types.ObjectId();
  const interestId = new mongoose.Types.ObjectId();
  const mockInterests = [interestId];
  const userId = new mongoose.Types.ObjectId();

  const mockProfile = {
    _id: profileId,
    displayName: 'John Doe',
    avatarSrc: 'avatar.jpg',
    gender: 'Male',
    birthday: new Date('1990-01-01'),
    horoscope: 'Capricorn',
    zodiac: 'Ox',
    height: { value: 180, unit: 'cm' },
    weight: { value: 75, unit: 'kg' },
    interest: mockInterests,
  };

  const mockUser = {
    _id: userId,
    username: 'anon',
    email: 'anon@mail.com',
    password: '123456',
    profile: 'someProfileId',
  };

  const mockRequest = {
    user: {
      sub: userId,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getModelToken(Profile.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProfile),
            find: jest.fn().mockResolvedValue([mockProfile]),
            findOne: jest.fn().mockResolvedValue(mockProfile),
            updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockProfile),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: 'REQUEST',
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    profileModel = module.get<Model<Profile>>(getModelToken(Profile.name));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockProfile as Profile);

      const result = await service.getProfile();
      expect(result).toEqual(mockProfile);
    });

    it('should throw BadRequestException if user does not exist', async () => {
      jest.spyOn(usersService, 'findOneById').mockResolvedValue(null);

      await expect(service.getProfile()).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if user does not have a profile', async () => {
      jest.spyOn(usersService, 'findOneById').mockResolvedValue({ ...mockUser, profile: null });

      await expect(service.getProfile()).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('should create a profile', async () => {
      const createProfileDto: CreateProfileDto = {
        displayName: 'John Doe',
        avatarSrc: 'avatar.jpg',
        gender: 'Male',
        birthday: new Date('1990-01-01'),
        horoscope: 'Capricorn',
        zodiac: 'Ox',
        height: { value: 180, unit: 'cm' },
        weight: { value: 75, unit: 'kg' },
        interest: mockInterests,
      };

      const result = await service.create(createProfileDto);
      expect(result).toEqual(mockProfile);
      expect(usersService.update).toHaveBeenCalledWith({
        id: mockRequest.user.sub,
        data: { profile: mockProfile._id },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProfile]);
    });
  });

  describe('findOne', () => {
    it('should return a single profile', async () => {
      const result = await service.findOne(profileId);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('update', () => {
    it('should update a profile', async () => {
      jest.spyOn(service, 'getProfile').mockResolvedValue(mockProfile as Profile);

      const updateProfileDto: CreateProfileDto = {
        displayName: 'Updated Name',
        avatarSrc: 'new-avatar.jpg',
        gender: 'Female',
        birthday: new Date('1991-01-01'),
        horoscope: 'Aquarius',
        zodiac: 'Rabbit',
        height: { value: 170, unit: 'cm' },
        weight: { value: 65, unit: 'kg' },
        interest: [new mongoose.Types.ObjectId()],
      };

      const result = await service.update(updateProfileDto);
      expect(result).toEqual({ nModified: 1 });
    });
  });

  describe('delete', () => {
    it('should delete a profile', async () => {
      jest.spyOn(service, 'getProfile').mockResolvedValue(mockProfile as Profile);

      const result = await service.delete();
      expect(result).toEqual(mockProfile);
    });
  });
});
