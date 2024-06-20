import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            /* mock JwtService methods if needed */
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call authService.signIn with the provided username and password', async () => {
      const signInDto: SignInDto = { username: 'test', password: 'password' };
      await controller.signIn(signInDto);
      expect(authService.signIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
    });
  });

  describe('getProfile', () => {
    it('should return the user profile from the request', () => {
      const req = { user: { id: 1, username: 'test' } };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});