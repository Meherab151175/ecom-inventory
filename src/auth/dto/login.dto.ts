// import { IsEmail, IsString, MinLength } from 'class-validator';

// export class LoginDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   @MinLength(6)
//   password: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;
}
