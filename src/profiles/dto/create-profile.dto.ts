export type measurement = {
  value: number;
  unit: string;
}


export class CreateProfileDto {
  readonly displayName: string;
  readonly avatarSrc: string;
  readonly gender: string;
  readonly birthday: Date;
  readonly horoscope: string;
  readonly zodiac: string;
  readonly height: measurement;
  readonly weight: measurement;
  readonly interest: string[]
}