import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  displayName: string;

  @Prop()
  avatarSrc: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop({ type: { value: Number, unit: String } })
  height: { value: number; unit: string };

  @Prop({ type: { value: Number, unit: String } })
  weight: { value: number; unit: string };

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Interest' })
  interest: mongoose.Types.ObjectId[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
