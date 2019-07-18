import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import assert from 'assert';
import { ApplicationModule } from '../../src/app.module';


describe('MessageController (e2e)', () => {
  let app;
  let user;
  let token;
  let room;

  beforeEach(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    let { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'string' })
    token = body.accessToken;

    let res = await request(app.getHttpServer())
      .get('/rooms')
      .set('Authorization', `bearer ${token}`) // Works.
    room = res.body[0];

    done();
  });

  it('/message (POST)', () => {
    return request(app.getHttpServer())
      .post('/messages')
      .send({ room: room.id, text: 'this is message!!!' })
      .set('Authorization', `bearer ${token}`) // Works.
      .expect(201)
      .expect((res) => {
        expect(typeof res.body).toBe('object')
      })
  });

  it('/rooms/{id}/messages (GET)', () => {
    return request(app.getHttpServer())
      .get(`/rooms/${room.id}/messages`)
      .set('Authorization', `bearer ${token}`) // Works.
      .expect(200)
      .expect((res) => {
        // console.log(res.body);
        expect(typeof res.body).toBe('object')
      })
  });

});
