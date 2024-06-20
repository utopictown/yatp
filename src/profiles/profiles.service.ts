import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private readonly profileModel: Model<Profile>) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const createdProfile = await this.profileModel.create(createProfileDto);
    return createdProfile;
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find();
  }

  async findOne(id: string): Promise<Profile> {
    return this.profileModel.findOne({ _id: id });
  }

  async delete(id: string) {
    const deletedProfile = await this.profileModel.findByIdAndDelete({ _id: id });
    return deletedProfile;
  }
}