import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { ProfilesService } from './profiles.service';
import { Profile } from './schemas/profile.schema';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let model: Model<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getModelToken(Profile.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    model = module.get<Model<Profile>>(getModelToken(Profile.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new profile', async () => {
      const createProfileDto = { 
        displayName: 'John Doe',
        avatarSrc: 'https://example.com/avatar.jpg',
        gender: 'male',
        height: {
          value: 180,
          unit: 'cm'
        },
        weight: {
          value: 70,
          unit: 'kg'
        },
        birthday: new Date(), 
        horoscope: 'aries', 
        interest: ['soccer', 'music', 'movie'],
        zodiac: 'goat' 
      };
      const createdProfile = {
        _id: '123asd',
        ...createProfileDto,
      } as unknown as Profile & { _id: string };
      
      const modelMock = {
        create: jest.fn().mockResolvedValue(createdProfile),
      };
      
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProfilesService,
          { provide: getModelToken('Profile'), useValue: modelMock },
        ],
      }).compile();
  
      const service = module.get<ProfilesService>(ProfilesService);
  
      const result = await service.create(createProfileDto);
  
      expect(modelMock.create).toHaveBeenCalledWith(createProfileDto);
      expect(result).toEqual(createdProfile);
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      const profiles = [
        { _id: 'profile-1', name: 'John Doe', email: 'john@example.com' },
        { _id: 'profile-2', name: 'Jane Smith', email: 'jane@example.com' },
      ];
      jest.spyOn(model, 'find').mockReturnThis();
      jest.spyOn(model, 'find').mockResolvedValue(profiles);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalled();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual(profiles);
    });
  });

  describe('findOne', () => {
    it('should return a profile by id', async () => {
      const profileId = 'profile-id';
      const profile = { _id: profileId, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(model, 'findOne').mockReturnThis();
      jest.spyOn(model, 'findOne').mockResolvedValue(profile);

      const result = await service.findOne(profileId);

      expect(model.findOne).toHaveBeenCalledWith({ _id: profileId });
      expect(model.findOne).toHaveBeenCalled();
      expect(result).toEqual(profile);
    });
  });

  describe('delete', () => {
    it('should delete a profile by id', async () => {
      const profileId = 'profile-id';
      const deletedProfile = { _id: profileId, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(model, 'findByIdAndDelete').mockReturnThis();
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(deletedProfile);

      const result = await service.delete(profileId);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith({ _id: profileId });
      expect(model.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toEqual(deletedProfile);
    });
  });
});