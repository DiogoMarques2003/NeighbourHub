import request from 'supertest';
import { app } from '@app';
import { PrismaClient } from '@prismaClient/client';
import bcrypt from 'bcryptjs';
import Users from '@entities/Users';

const prisma = new PrismaClient();

describe('Login do utilizador', () => {
  const password = '12345678';
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new Users({
    email: 'teste@teste.pt',
    password: hashedPassword,
    name: 'Teste',
    iban: 'PT509999999999999999999999',
    phoneNumber: '123456789',
  });

  // Executa antes de todos os testes
  beforeAll(async () => {
    await prisma.$connect();

    await prisma.users.create({ data: user });
  });

  // Executa depois de todos os testes
  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve fazer login com sucesso', async () => {
    const result = await request(app).post('/api/login').send({ email: user.email, password });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('token');
    expect(typeof result.body.token).toBe('string');
  });

  it('Deve falhar o login', async () => {
    const result = await request(app).post('/api/login').send({ email: user.email, password: 'passwordErrada' });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
  });
});
