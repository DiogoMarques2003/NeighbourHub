import request from 'supertest';
import { app } from '@app';
import { PrismaClient } from '@prismaClient/client';
import bcrypt from 'bcryptjs';
import Users from '@entities/Users';
import Condominiums from '@entities/Condominiums';
import Addresses from '@entities/Addresses';
import { resolve } from 'path';

const prisma = new PrismaClient();

describe('Criação de Área Comum', () => {
  let adminToken: string;
  let residentToken: string;
  let condominiumId: string;

  const image = resolve(__dirname, '..', '..', '..', '..', 'imagesTest', 'image1.jpg');

  beforeAll(async () => {
    await prisma.$connect();

    const password = '12345678';
    const hashedPassword = bcrypt.hashSync(password, 10);

    const adminUser = new Users({
      email: 'admin@teste.pt',
      password: hashedPassword,
      name: 'Admin',
      iban: 'PT509999999999999999999999',
      phoneNumber: '123456789',
    });

    const residentUser = new Users({
      email: 'morador@teste.pt',
      password: hashedPassword,
      name: 'Morador',
      iban: 'PT509999999999999999999999',
      phoneNumber: '987654321',
    });

    await prisma.users.createMany({ data: [adminUser, residentUser] });

    const adminLogin = await request(app).post('/api/login').send({
      email: 'admin@teste.pt',
      password: '12345678',
    });
    adminToken = adminLogin.body.token;

    const residentLogin = await request(app).post('/api/login').send({
      email: 'morador@teste.pt',
      password: '12345678',
    });
    residentToken = residentLogin.body.token;

    const condominium = new Condominiums({
      name: 'Condomínio Teste',
      email: 'condominio@teste.pt',
      phoneNumber: '123456789',
      monthlyQuota: 100,
      adminId: adminUser.id,
    });
    await prisma.condominiums.create({ data: condominium });
    condominiumId = condominium.id;

    const address = new Addresses({
      userId: residentUser.id,
      condominiumId: condominium.id,
      street: 'Rua Teste',
      city: 'Cidade Teste',
      country: 'País Teste',
      postalCode: '1234-567',
      houseNumber: '13',
      houseType: 2,
    });
    await prisma.addresses.create({ data: address });
  });

  afterAll(async () => {
    await prisma.addresses.deleteMany();
    await prisma.condominiums.deleteMany();
    await prisma.users.deleteMany();
    await prisma.commonAreas.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve criar uma área comum com sucesso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${adminToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '08:00')
      .field('endSchedule', '22:00');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commonArea');
    expect(response.body.commonArea).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir criar uma área comum', async () => {
    const response = await request(app)
      .post(`/api/condominium/${condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${residentToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '08:00')
      .field('endSchedule', '22:00');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por falta de campos obrigatórios', async () => {
    const response = await request(app)
      .post(`/api/condominium/${condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${adminToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por o startSchedule ser maior que o endSchedule', async () => {
    const response = await request(app)
      .post(`/api/condominium/${condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${adminToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '22:00')
      .field('endSchedule', '08:00');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
