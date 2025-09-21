import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Inventory API')
    .setDescription('API documentation for E-Commerce Inventory project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`Server running at http://localhost:3000`);
  console.log(`Swagger docs available at http://localhost:3000/docs`);
}
bootstrap();
