import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: parseAllowedOrigins(),
  });
  await app.listen(3000);
}
bootstrap();

const parseAllowedOrigins = () => {
  const origins: string[] = process.env['APP_CORS_ALLOWED_ORIGINS'].split(',');
  console.log(JSON.stringify(origins), 'parsed allowed origins');
  return origins;
};
