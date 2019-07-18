import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import assert from 'assert';
import { ApplicationModule } from '../../src/app.module';


describe('RoomController (e2e)', () => {
  let app;
  let user;
  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'string' })      
      .expect((res) => {
        token = res.body.accessToken;        
      })
  });

  it('/rooms (GET)', () => {
    return request(app.getHttpServer())
      .get('/rooms')
      .set('Authorization', `bearer ${token}`) // Works.
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toBe('object')
      })
  });
});
