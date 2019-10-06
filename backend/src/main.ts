import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const BASE_API_PATH = 'api/v1';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // Create nest app
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_API_PATH);
  app.enableCors();

  // Initialize swagger module
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .setBasePath(BASE_API_PATH)
    .addTag('observations')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${BASE_API_PATH}/swagger`, app, document);

  // Expose app
  await app.listen(PORT);
}
bootstrap();
