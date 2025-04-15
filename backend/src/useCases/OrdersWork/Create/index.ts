import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaOrderWorksRepository from '@repositories/implementations/PrismaOrderWorksRepository';
import CreateOrdersWorkVerifications from './CreateOrdersWorkVerifications';
import CreateOrdersWorkCase from './CreateOrdersWorkCase';
import CreateOrdersWorkController from './CreateOrdersWorkController';

const condominiumRepository = new PrismaCondominiumsRepository();
const ordersRepository = new PrismaOrdersRepository();
const orderWorksRepository = new PrismaOrderWorksRepository();

const createOrdersWorkVerifications = new CreateOrdersWorkVerifications();
const createOrdersWorkCase = new CreateOrdersWorkCase(condominiumRepository, ordersRepository, orderWorksRepository);

const createOrdersWorkController = new CreateOrdersWorkController(createOrdersWorkVerifications, createOrdersWorkCase);

export { createOrdersWorkController };
