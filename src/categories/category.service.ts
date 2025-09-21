import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { products: true },
    });

    // Optional: Include product count
    return categories.map((cat) => ({
      ...cat,
      productCount: cat.products.length,
    }));
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id); // ensure category exists
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category.products.length > 0)
      throw new BadRequestException('Cannot delete category with products');
    return this.prisma.category.delete({ where: { id } });
  }
}
