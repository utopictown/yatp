import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type InterestDocument = HydratedDocument<Interest>;

@Schema()
export class Interest {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, index: true })
  displayName: {
    type: String;
    required: true;
    index: true;
  };

  @Prop()
  description: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
