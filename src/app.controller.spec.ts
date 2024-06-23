import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ProfilesService } from './profiles/profiles.service';
import { SignUpDto } from './auth/dto/signup.dto';
import { SignInDto } from './auth/dto/signin.dto';
import { CreateProfileDto } from './profiles/dto/create-profile.dto';
import { AuthGuard } from './auth/auth.guard';
import { User } from './users/schemas/user.schema';
import mongoose from 'mongoose';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let authService: AuthService;
  let profileService: ProfilesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        ProfilesService,
        UsersService,
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
        {
          provide: ProfilesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            getProfile: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: getModelToken('Profile'),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            updateOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    authService = moduleRef.get<AuthService>(AuthService);
    profileService = moduleRef.get<ProfilesService>(ProfilesService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('register', () => {
    it('should call authService.signUp with the signUpDto', () => {
      const signUpDto: SignUpDto = { username: 'test', email: 'test@mail.com', password: 'password' };
      const mockUser: User = { _id: new mongoose.Types.ObjectId(), username: 'john', email: 'john@mail.com', password: 'password', profile: new mongoose.Types.ObjectId() };
      jest.spyOn(authService, 'signUp').mockResolvedValue(mockUser);

      appController.register(signUpDto);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('login', () => {
    it('should call authService.signIn with the username and password', () => {
      const signInDto: SignInDto = { username: 'test', password: 'password' };
      jest.spyOn(authService, 'signIn').mockResolvedValue({ access_token: 'token' });

      appController.login(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
    });
  });

  describe('createProfile', () => {
    it('should call profilesService.create with the createProfileDto', () => {
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
        interest: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        zodiac: 'goat',
      };

      appController.createProfile(createProfileDto);

      expect(profileService.create).toHaveBeenCalledWith(createProfileDto);
    });
  });

  describe('getProfile', () => {
    it('should call profilesService.getProfile', () => {
      appController.getProfile();

      expect(profileService.getProfile).toHaveBeenCalled();
    });
  });

  describe('updateProfile', () => {
    it('should call profilesService.update with the updateProfileDto', () => {
      const updateProfileDto: CreateProfileDto = {
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

      appController.updateProfile(updateProfileDto);

      expect(profileService.update).toHaveBeenCalledWith(updateProfileDto);
    });
  });
});
