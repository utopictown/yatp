import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model, UpdateWriteOpResult } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findOneByEmailOrUsername({ email, username }: { email: string; username: string }): Promise<User | undefined> {
    return this.userModel.findOne({ $or: [{ email }, { username }] });
  }

  async findOneById(id: string | mongoose.Types.ObjectId): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async create({ email, username, password }: SignUpDto): Promise<User | undefined> {
    return this.userModel.create({ email, username, password });
  }

  async update({ id, data }): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id }, { $set: { ...data } });
  }
}
