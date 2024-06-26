import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return access token for valid credentials', async () => {
      const user = { _id: new mongoose.Types.ObjectId(), username: 'john', email: 'john@mail.com', password: 'hashedPassword', profile: new mongoose.Types.ObjectId() };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('access_token');
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await authService.signIn('john', 'password');

      expect(usersService.findOne).toHaveBeenCalledWith('john');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user._id,
        username: user.username,
      });
      expect(result).toEqual({ access_token: 'access_token' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(authService.signIn('john', 'wrong_password')).rejects.toThrow(UnauthorizedException);
    });
  });
});
