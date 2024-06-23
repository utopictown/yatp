import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  _id: mongoose.Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Profile', required: false })
  profile: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
