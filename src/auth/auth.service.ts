import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, username, password }: SignUpDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmailOrUsername({ email, username });
    if (user) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({ email, username, password: hashedPassword });
    const createdUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profile: null,
    };
    return createdUser;
  }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException('User not found');
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
