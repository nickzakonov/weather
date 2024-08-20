import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

export async function auth(server: HttpServer) {
  const {
    body: { token },
  } = await request(server)
    .post('/auth')
    .send({ email: 'user1@gmail.com', password: '123456Abc!' });

  return token;
}
describe('User (e2e)', () => {
  let app: INestApplication;
  let server: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
    await server.close();
  });

  describe('/auth (POST)', () => {
    it('should return auth token when valid credentials are given', async () => {
      await request(server)
        .post('/auth')
        .send({ email: 'user1@gmail.com', password: '123456Abc!' })
        .expect(201);
    });

    it('should fail when invalid credentials are given', async () => {
      await request(server)
        .post('/auth')
        .send({ email: 'user1@gmail.com', password: '123456Ab' })
        .expect(401);
    });
  });

  describe('/user (GET)', () => {
    it('should return request limit and actual number of requests', async () => {
      const token = await auth(server);
      await request(server)
        .get('/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(({ body }) => expect(typeof body.requestLimit).toBe('number'))
        .expect(({ body }) => expect(typeof body.requestCount).toBe('number'));
    });
  });
});
