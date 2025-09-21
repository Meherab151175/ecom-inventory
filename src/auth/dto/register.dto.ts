// import { IsEmail, IsString, MinLength } from 'class-validator';

// export class RegisterDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   username: string;

//   @IsString()
//   @MinLength(6)
//   password: string;
// }

import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;
}
