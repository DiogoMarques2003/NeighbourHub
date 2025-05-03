import request from 'supertest';
import { app } from '@app';
import { PrismaClient } from '@prismaClient/client';

const prisma = new PrismaClient();

describe('Login do utilizador', () => {
  it('Deve fazer login com sucesso', async () => {
    const result = await request(app).post('/api/login').send({ email: 'admin@teste.pt', password: '12345678' });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('token');
    expect(typeof result.body.token).toBe('string');
  });

  it('Deve falhar o login', async () => {
    const result = await request(app).post('/api/login').send({ email: 'admin@teste.pt', password: 'passwordErrada' });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
  });
});
