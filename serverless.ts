import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './src/app.module';

const server = express();
let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    await app.init();
    initialized = true;
  }
  server(req, res);
}
