import { NestFactory } from '@nestjs/core';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // default import
import { AppModule } from 'src/app.module';
const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
}

bootstrap();

export const handler = serverless(expressApp);
