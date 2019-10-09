import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const BASE_API_PATH = 'api/v1';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // Create nest app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(BASE_API_PATH);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'assets'));

  // Initialize swagger module
  const options = new DocumentBuilder()
    .setTitle('Generation Ocean API')
    .setDescription(
      'Available resources for Generation Ocean API. For more information please contact Generation Ocean association',
    )
    .setVersion('1.0')
    .setBasePath(BASE_API_PATH)
    .addTag('observations')
    .addTag('transects')
    .addTag('quadrats')
    .addTag('sites')
    .addTag('users')
    .addTag('alguae-descriptions')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${BASE_API_PATH}/swagger`, app, document);

  // Expose app
  await app.listen(PORT);
}
bootstrap();
