// import { IsString, IsNumber, IsOptional } from 'class-validator';

// export class CreateProductDto {
//   @IsString() name: string;
//   @IsString() @IsOptional() description?: string;
//   @IsNumber() price: number;
//   @IsNumber() stock: number;
//   @IsNumber() categoryId: number;
//   @IsString() @IsOptional() imageUrl?: string;
// }

import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Product description', nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product stock quantity' })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ description: 'Product image URL', nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string | null;

  @ApiProperty({ description: 'Category ID' })
  @IsNumber()
  categoryId: number;
}
