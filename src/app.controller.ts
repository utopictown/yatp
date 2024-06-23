import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SignUpDto } from './auth/dto/signup.dto';
import { SignInDto } from './auth/dto/signin.dto';
import { CreateProfileDto } from './profiles/dto/create-profile.dto';
import { ProfilesService } from './profiles/profiles.service';
import { AuthGuard } from './auth/auth.guard';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly profileService: ProfilesService,
  ) {}

  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Post('createProfile')
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get('getProfile')
  getProfile() {
    return this.profileService.getProfile();
  }

  @UseGuards(AuthGuard)
  @Put('updateProfile')
  updateProfile(@Body() updateProfileDto: CreateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get('viewMessages')
  viewMessages(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Post('sendMessage')
  sendMessage(): string {
    return this.appService.getHello();
  }
}
