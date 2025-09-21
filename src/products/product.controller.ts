import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post() create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @Get() findAll(@Query() query) {
    return this.productService.findAll(query);
  }
  @Get('search') search(@Query('q') q: string) {
    return this.productService.findAll({ name: q });
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @Put(':id') update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
