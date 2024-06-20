import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interest } from './schemas/interest.schema';
import { Model } from 'mongoose';
import { CreateInterestDto } from './dto/create-interest.dto';

@Injectable()
export class InterestsService {
  constructor(@InjectModel(Interest.name) private readonly interestModel: Model<Interest>) {}

  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const createdProfile = await this.interestModel.create(createInterestDto);
    return createdProfile;
  }

  async findAll(): Promise<Interest[]> {
    return this.interestModel.find();
  }

  async search(query: string): Promise<Interest[]> {
    const regex = new RegExp(query, 'i');
    return this.interestModel.find({ displayName: regex });
  }

  async findOne(id: string): Promise<Interest> {
    return this.interestModel.findOne({ _id: id });
  }

  async delete(id: string) {
    const deletedProfile = await this.interestModel.findByIdAndDelete({ _id: id });
    return deletedProfile;
  }
}
