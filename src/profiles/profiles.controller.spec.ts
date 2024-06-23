import { Test } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: ProfilesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should create a profile', async () => {
    const createProfileDto: CreateProfileDto = {
      displayName: 'John Doe',
      avatarSrc: 'https://example.com/avatar.jpg',
      gender: 'male',
      height: {
        value: 180,
        unit: 'cm',
      },
      weight: {
        value: 70,
        unit: 'kg',
      },
      birthday: new Date(),
      horoscope: 'aries',
      interest: ['soccer', 'music', 'movie'],
      zodiac: 'goat',
    };
    await controller.create(createProfileDto);
    expect(service.create).toHaveBeenCalledWith(createProfileDto);
  });

  it('should return an array of profiles', async () => {
    const profiles: Profile[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        displayName: 'John Doe',
        avatarSrc: 'https://example.com/avatar.jpg',
        gender: 'male',
        height: {
          value: 180,
          unit: 'cm',
        },
        weight: {
          value: 70,
          unit: 'kg',
        },
        birthday: new Date(),
        horoscope: 'aries',
        interest: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        zodiac: 'goat',
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(profiles);
    expect(await controller.findAll()).toBe(profiles);
  });

  it('should return a profile by id', async () => {
    const profile: Profile = {
      _id: new mongoose.Types.ObjectId(),
      displayName: 'John Doe',
      avatarSrc: 'https://example.com/avatar.jpg',
      gender: 'male',
      height: {
        value: 180,
        unit: 'cm',
      },
      weight: {
        value: 70,
        unit: 'kg',
      },
      birthday: new Date(),
      horoscope: 'aries',
      interest: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
      zodiac: 'goat',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(profile);
    expect(await controller.findOne('profile-id')).toBe(profile);
  });

  it('should delete a profile', async () => {
    await controller.delete('profile-id');
    expect(service.delete).toHaveBeenCalledWith('profile-id');
  });
});
