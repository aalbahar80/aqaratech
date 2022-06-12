import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [TenantsModule, PortfoliosModule],
  });
  // move below?
  writeFileSync('./openapi.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}

bootstrap();
