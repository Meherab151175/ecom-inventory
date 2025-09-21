import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({ description: 'Category name', nullable: true })
  name?: string;

  @ApiPropertyOptional({ description: 'Category description', nullable: true })
  description?: string;
}
