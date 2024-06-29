import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsObject, IsString, IsUrl, Min, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class Measurement {
  @IsNotEmpty()
  @Min(0)
  readonly value: number;

  @IsNotEmpty()
  @IsString()
  readonly unit: string;
}

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly displayName: string;

  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  readonly avatarSrc: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsNotEmpty()
  @IsDateString()
  readonly birthday: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => Measurement)
  readonly height: Measurement;

  @IsObject()
  @ValidateNested()
  @Type(() => Measurement)
  readonly weight: Measurement;

  @IsArray()
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  readonly interest: mongoose.Types.ObjectId[];
}
