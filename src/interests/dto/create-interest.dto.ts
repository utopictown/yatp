import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestDto {
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;
}
