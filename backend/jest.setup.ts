/// <reference path="./src/@types/global.d.ts" />
import { PrismaClient } from './src/prisma-client/client';
import bcrypt from 'bcryptjs';
import Users from './src/entities/Users';
import Condominiums from './src/entities/Condominiums';
import Addresses from './src/entities/Addresses';
import CommonAreas from './src/entities/CommonAreas';
import request from 'supertest';
import { app } from './src/app';
import { STATUS_READY } from './src/constants/status';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  global.prisma = prisma;

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
  global.adminToken = adminLogin.body.token;

  const residentLogin = await request(app).post('/api/login').send({
    email: 'morador@teste.pt',
    password: '12345678',
  });
  global.residentToken = residentLogin.body.token;

  const condominium = new Condominiums({
    name: 'Condomínio Teste',
    email: 'condominio@teste.pt',
    phoneNumber: '123456789',
    monthlyQuota: 100,
    adminId: adminUser.id,
  });
  await prisma.condominiums.create({ data: condominium });
  global.condominiumId = condominium.id;

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

  global.commonArea = new CommonAreas({
    name: 'Área Comum Teste',
    capacity: 10,
    condominiumId: condominium.id,
    endSchedule: '22:00',
    startSchedule: '08:00',
    images: ['/files/commonAreasPictures/teste.jpg'],
    cost: 10,
    rules: 'Regras da área comum',
    status: STATUS_READY,
    type: 2,
  });
  await prisma.commonAreas.create({ data: global.commonArea });
  global.commonAreaId = commonArea.id;
});

afterAll(async () => {
  await prisma.commonAreas.deleteMany();
  await prisma.addresses.deleteMany();
  await prisma.condominiums.deleteMany();
  await prisma.users.deleteMany();
  await prisma.$disconnect();
});
