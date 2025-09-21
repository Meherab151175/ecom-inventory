import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: dto,
    });
  }

  async findAll(params: {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    name?: string;
  }) {
    const {
      categoryId,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      name,
    } = params;
    return this.prisma.product.findMany({
      where: {
        categoryId: categoryId || undefined,
        price: { gte: minPrice || 0, lte: maxPrice || undefined },
        name: { contains: name || undefined },
      },
      skip: (page - 1) * limit,
      take: limit,
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
