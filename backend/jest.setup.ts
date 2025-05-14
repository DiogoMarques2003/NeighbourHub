/// <reference path="./src/@types/global.d.ts" />
import { PrismaClient } from './src/prisma-client/client';
import bcrypt from 'bcryptjs';
import Users from './src/entities/Users';
import Condominiums from './src/entities/Condominiums';
import Addresses from './src/entities/Addresses';
import CommonAreas from './src/entities/CommonAreas';
import AreaReservations from './src/entities/AreaReservations';
import request from 'supertest';
import { app } from './src/app';
import {
  STATUS_READY,
  STATUS_REQ,
  STATUS_REQ_CANCELED,
  STATUS_REQ_COMPLETED,
  STATUS_REQ_PENDING,
  STATUS_RESERV_APPROVED,
  STATUS_ORDER_IN_PROGRESS,
  STATUS_ORDER_PENDING,
  STATUS_ORDER_VOTING,
} from './src/constants/status';
import { URGENCY_LOW } from './src/constants/urgency';
import Services from './src/entities/Services';
import ServiceRequests from './src/entities/ServiceRequests';
import Order from './src/entities/Orders';
import Budgets from './src/entities/Budgets';
import OrderWorks from './src/entities/OrderWorks';

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
  global.admin = adminUser;

  const residentUser = new Users({
    email: 'morador@teste.pt',
    password: hashedPassword,
    name: 'Morador',
    iban: 'PT509999999999999999999999',
    phoneNumber: '987654321',
  });
  global.residentId = residentUser.id;
  global.resident = residentUser;

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
  global.condominium = condominium;

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

  const serviceReqPending2 = new ServiceRequests({
    serviceId: service.id,
    status: STATUS_REQ_PENDING,
    userId: resident2User.id,
  });
  global.serviceReqPending2 = serviceReqPending2;
  await prisma.serviceRequests.createMany({ data: [serviceReqCompleted, serviceReqPending, serviceReqPending2] });

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

  const reservation = new AreaReservations({
    userId: residentUser.id,
    areaId: global.commonAreaId,
    startDate: new Date('2026-01-01T10:00:00'),
    endDate: new Date('2026-01-01T12:00:00'),
    status: STATUS_RESERV_APPROVED,
  });

  await prisma.areaReservations.create({ data: reservation });
  global.reservation = reservation;

  const order = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_IN_PROGRESS,
    urgency: 'LOW',
    userId: residentId,
    startDate: new Date('2026-01-01T10:00:00'),
    endDate: new Date('2026-01-01T10:00:00'),
    votingDeadline: new Date('2026-01-01T12:00:00'),
  });

  const pendingOrder = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_PENDING,
    urgency: 'LOW',
    userId: residentId,
    startDate: new Date('2026-01-01T10:00:00'),
    endDate: new Date('2026-01-01T10:00:00'),
    votingDeadline: new Date('2026-01-01T12:00:00'),
  });

  const pendingOrder2 = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_PENDING,
    urgency: URGENCY_LOW,
    userId: residentUser.id
  });

  const inProgressOrder = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_IN_PROGRESS,
    urgency: URGENCY_LOW,
    userId: residentUser.id,
    startDate: new Date('2026-01-01T10:00:00'),
    endDate: new Date('2026-01-01T10:00:00'),
    votingDeadline: new Date('2026-01-01T12:00:00'),
  });

  const votingOrderWithBudgets = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_VOTING,
    urgency: URGENCY_LOW,
    userId: residentUser.id,
    votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const votingOrderWithoutBudgets = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_VOTING,
    urgency: URGENCY_LOW,
    userId: residentUser.id,
    votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias à frente
  });

  const votingOrderDeadLineGone = new Order({
    condominiumId: global.condominiumId,
    description: 'TESTE',
    status: STATUS_ORDER_VOTING,
    urgency: URGENCY_LOW,
    userId: residentUser.id,
    votingDeadline: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
  });

  await prisma.orders.createMany({ data: [order, pendingOrder, pendingOrder2, inProgressOrder, votingOrderWithBudgets, votingOrderWithoutBudgets, votingOrderDeadLineGone] });
  global.orderId = order.id;
  global.pendingOrderId = pendingOrder.id;
  global.pendingOrder2Id = pendingOrder2.id;
  global.inProgressOrderId = inProgressOrder.id;
  global.votingOrderWithBudgetsId = votingOrderWithBudgets.id;
  global.votingOrderWithoutBudgetsId = votingOrderWithoutBudgets.id;
  global.votingOrderDeadLineGoneId = votingOrderDeadLineGone.id

  const budget1 = new Budgets({
    description: "Budget 1",
    amount: 30,
    orderId: votingOrderWithBudgets.id
  });

  const budget2 = new Budgets({
    description: "Budget 2",
    amount: 10,
    orderId: votingOrderWithBudgets.id
  });

  const budget3 = new Budgets({
    description: "Teste 3 budget",
    amount: 80,
    orderId: votingOrderWithBudgets.id
  });

  await prisma.budgets.createMany({data: [budget1, budget2, budget3]});
  global.budget1Id = budget1.id;
  global.budget2Id = budget2.id;
  global.budget3Id = budget3.id;

  const workOrder = new OrderWorks({
    description: 'TESTE',
    orderId: global.orderId,
    status: STATUS_ORDER_PENDING,
    reportFile: '',
  });

  await prisma.orderWorks.create({ data: workOrder });
  global.orderWorkId = workOrder.id;
});

afterAll(async () => {
  await prisma.commonAreas.deleteMany();
  await prisma.addresses.deleteMany();
  await prisma.condominiums.deleteMany();
  await prisma.users.deleteMany();
  await prisma.services.deleteMany();
  await prisma.serviceRequests.deleteMany();
  await prisma.serviceReviews.deleteMany();
  await prisma.areaReservations.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.orderWorks.deleteMany();
  await prisma.budgets.deleteMany();
  await prisma.$disconnect();
});
