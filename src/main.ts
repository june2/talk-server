import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { ConfigService } from './common/config/config.service';
import { ErrorFilter } from './common/filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  const configService: ConfigService = app.get(ConfigService);
  // Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Filter
  app.useGlobalFilters(new ErrorFilter(configService))
  // cors
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  // static
  app.useStaticAssets(join(__dirname, '..', 'upload'));
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('nest.js rest api example')
    .setDescription('nest.js rest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.port);
}
bootstrap();
