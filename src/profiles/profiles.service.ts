import { BadRequestException, Inject, Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import { UsersService } from '../users/users.service';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedUser } from '../auth/dto/authenticated-user.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    private readonly usersService: UsersService,
    @Inject(REQUEST) private readonly request: Request & { user: AuthenticatedUser },
  ) {}

  async getProfile(): Promise<Profile> {
    const user = await this.usersService.findOneById(this.request.user.sub);
    if (!user) throw new BadRequestException('User does not exist');
    if (!user.profile) throw new BadRequestException('User does not have a profile');
    return this.findOne(user.profile);
  }
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profileObj = {
      displayName: createProfileDto.displayName,
      avatarSrc: createProfileDto.avatarSrc,
      gender: createProfileDto.gender,
      birthday: createProfileDto.birthday,
      horoscope: createProfileDto.horoscope,
      zodiac: createProfileDto.zodiac,
      height: createProfileDto.height,
      weight: createProfileDto.weight,
      interest: createProfileDto.interest,
    };
    const createdProfile = await this.profileModel.create(profileObj);
    await this.usersService.update({ id: this.request.user.sub, data: { profile: createdProfile._id } });
    return createdProfile;
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find();
  }

  async findOne(id: mongoose.Types.ObjectId | string): Promise<Profile> {
    return this.profileModel.findOne({ _id: id });
  }

  async update(updateProfileDto: CreateProfileDto): Promise<UpdateWriteOpResult> {
    const profile = await this.getProfile();
    const profileObj = {
      displayName: updateProfileDto.displayName,
      avatarSrc: updateProfileDto.avatarSrc,
      gender: updateProfileDto.gender,
      birthday: updateProfileDto.birthday,
      horoscope: updateProfileDto.horoscope,
      zodiac: updateProfileDto.zodiac,
      height: updateProfileDto.height,
      weight: updateProfileDto.weight,
      interest: updateProfileDto.interest,
    };
    return this.profileModel.updateOne({ _id: profile._id }, { $set: profileObj }, { upsert: true });
  }

  async delete() {
    const profile = await this.getProfile();
    const deletedProfile = await this.profileModel.findByIdAndDelete({ _id: profile._id });
    return deletedProfile;
  }
}
