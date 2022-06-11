import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}

bootstrap();
