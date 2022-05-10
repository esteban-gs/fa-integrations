import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateFormDto {
  @Matches(/^\S+$/)
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
