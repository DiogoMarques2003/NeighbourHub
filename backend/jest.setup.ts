/// <reference path="./src/@types/global.d.ts" />
import { PrismaClient } from './src/prisma-client/client';
import bcrypt from 'bcryptjs';
import Users from './src/entities/Users';
import Condominiums from './src/entities/Condominiums';
import Addresses from './src/entities/Addresses';
import CommonAreas from './src/entities/CommonAreas';
import request from 'supertest';
import { app } from './src/app';
import {
  STATUS_READY,
  STATUS_REQ,
  STATUS_REQ_CANCELED,
  STATUS_REQ_COMPLETED,
  STATUS_REQ_PENDING,
} from './src/constants/status';
import Services from './src/entities/Services';
import ServiceRequests from './src/entities/ServiceRequests';

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
  global.adminId = adminUser.id;

  const residentUser = new Users({
    email: 'morador@teste.pt',
    password: hashedPassword,
    name: 'Morador',
    iban: 'PT509999999999999999999999',
    phoneNumber: '987654321',
  });
  global.residentId = residentUser.id;

  const resident2User = new Users({
    email: 'morador2@teste.pt',
    password: hashedPassword,
    name: 'Morador2',
    iban: 'PT509999999999999999999999',
    phoneNumber: '987654321',
  });
  global.resident2Id = resident2User.id;

  const nonResidentUser = new Users({
    email: 'NonMorador@teste.pt',
    password: hashedPassword,
    name: 'NonMorador',
    iban: 'PT509999999999999999999999',
    phoneNumber: '987654321',
  });

  await prisma.users.createMany({ data: [adminUser, residentUser, resident2User, nonResidentUser] });

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

  const resident2Login = await request(app).post('/api/login').send({
    email: 'morador2@teste.pt',
    password: '12345678',
  });
  global.resident2Token = resident2Login.body.token;

  const nonResidentLogin = await request(app).post('/api/login').send({
    email: 'NonMorador@teste.pt',
    password: '12345678',
  });
  global.nonResidentToken = nonResidentLogin.body.token;

  const condominium = new Condominiums({
    name: 'Condomínio Teste',
    email: 'condominio@teste.pt',
    phoneNumber: '123456789',
    monthlyQuota: 100,
    adminId: adminUser.id,
  });
  await prisma.condominiums.create({ data: condominium });
  global.condominiumId = condominium.id;

  const service = new Services({
    name: 'Limpeza',
    cost: 120,
    description: 'Limpo tudo',
    ownerId: residentUser.id,
    condominiumId: condominium.id,
  });
  await prisma.services.create({ data: service });
  global.service = service;

  const serviceReqCompleted = new ServiceRequests({
    serviceId: service.id,
    status: STATUS_REQ_COMPLETED,
    userId: resident2User.id,
  });
  global.serviceReqCompleted = serviceReqCompleted;

  const serviceReqPending = new ServiceRequests({
    serviceId: service.id,
    status: STATUS_REQ_PENDING,
    userId: resident2User.id,
  });
  global.serviceReqPending = serviceReqPending;
  await prisma.serviceRequests.createMany({ data: [serviceReqCompleted, serviceReqPending] });

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

  const address2 = new Addresses({
    userId: resident2User.id,
    condominiumId: condominium.id,
    street: 'Rua Teste',
    city: 'Cidade Teste',
    country: 'País Teste',
    postalCode: '1234-567',
    houseNumber: '13',
    houseType: 2,
  });

  await prisma.addresses.createMany({ data: [address, address2] });

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
  await prisma.services.deleteMany();
  await prisma.serviceRequests.deleteMany();
  await prisma.serviceReviews.deleteMany();
  await prisma.$disconnect();
});
