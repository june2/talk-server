import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from '../../src/common/config/config.service';
import { UserModule } from '../../src/api/user/user.module';
import { User } from '../../src/api/user/user.entity';
import { UserService } from '../../src/api/user/user.service';

describe('Users', () => {
  const userService = {
    findAll: () => ['test', 'test'],
    create: () => 'test'
  };

  let app: INestApplication;
  const config: ConfigService = new ConfigService();

  beforeAll(async () => {    

    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: config.dbType,
          host: config.dbHost,
          port: config.dbPort,
          database: config.dbName,
          entities: [join(process.env.PWD, 'src/**/**.entity{.ts,.js}')],
          synchronize: true,
          useNewUrlParser: true
        }),
        TypeOrmModule.forFeature([User]),
        UserModule,
      ]
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`GET /users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userService.findAll());
  });

  it(`POST /users`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'test' })
      .expect(201)
      .expect(userService.create());
  });

  afterAll(async () => {
    await app.close();
  });
});
