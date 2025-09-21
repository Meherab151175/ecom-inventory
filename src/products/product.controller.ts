import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // single image
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;

    if (file) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );

      const folderName = `products/${uuidv4()}`;
      const filePath = `${folderName}/${file.originalname}`;

      const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file.buffer, { contentType: file.mimetype });

      if (error) throw new Error(`Failed to upload image: ${error.message}`);

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${filePath}`;
    }

    return this.productService.create({
      ...dto,
      price: parseFloat(dto.price as any),
      stock: parseInt(dto.stock as any, 10),
      categoryId: parseInt(dto.categoryId as any, 10),
      imageUrl,
    });
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
