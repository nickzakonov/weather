import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { auth } from './user.e2e-spec';

describe('Weather (e2e)', () => {
  let app: INestApplication;
  let server: HttpServer;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    token = await auth(server);
  });

  afterAll(async () => {
    await app.close();
    await server.close();
  });

  describe('/weather (GET)', () => {
    it('should return weather info for a given date', async () => {
      await request(server)
        .get('/weather/Moscow/2024-08-20/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should return no records for unknown date', async () => {
      await request(server)
        .get('/weather/Moscow/2024-08-30/')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should return error for invalid input', async () => {
      await request(server)
        .get('/weather/Moscow/2024-08/')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });
});
