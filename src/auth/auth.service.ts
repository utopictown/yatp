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

  async signUp({ email, username, password }: SignUpDto): Promise<User> {
    const user = await this.usersService.findOneByEmailOrUsername({ email, username });
    if (user) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, username, password: hashedPassword });
  }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('User not found');
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new BadRequestException('Wrong password');
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
