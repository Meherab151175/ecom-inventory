import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, ProductsModule, CategoriesModule, PrismaModule],
  providers: [],
})
export class AppModule {}
