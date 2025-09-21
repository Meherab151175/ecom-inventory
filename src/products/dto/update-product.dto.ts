// import { PartialType } from '@nestjs/mapped-types';
// import { CreateProductDto } from './create-product.dto';

// export class UpdateProductDto extends PartialType(CreateProductDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'Product name', nullable: true })
  name?: string;

  @ApiPropertyOptional({ description: 'Product description', nullable: true })
  description?: string;

  @ApiPropertyOptional({ description: 'Product price', nullable: true })
  price?: number;

  @ApiPropertyOptional({ description: 'Product stock', nullable: true })
  stock?: number;

  @ApiPropertyOptional({ description: 'Product image URL', nullable: true })
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Category ID', nullable: true })
  categoryId?: number;
}
