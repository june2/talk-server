import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import assert from 'assert';
import { ApplicationModule } from './../../src/app.module';


describe('UserController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toBe('object')
      })
  });
});
