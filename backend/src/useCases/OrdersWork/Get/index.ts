import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaOrderWorksRepository from '@repositories/implementations/PrismaOrderWorksRepository';
import GetOrdersWorkVerifications from './GetOrdersWorkVerifications';
import GetOrdersWorkCase from './GetOrdersWorkCase';
import GetOrdersworkController from './GetOrdersWorkController';

const condominiumRepository = new PrismaCondominiumsRepository();
const ordersRepository = new PrismaOrdersRepository();
const orderWorksRepository = new PrismaOrderWorksRepository();
const addressRepository = new PrismaAddressesRepository();

const getOrdersWorkVerifications = new GetOrdersWorkVerifications();
const getOrdersWorkCase = new GetOrdersWorkCase(
  condominiumRepository,
  ordersRepository,
  orderWorksRepository,
  addressRepository
);

const getOrdersWorkController = new GetOrdersworkController(getOrdersWorkVerifications, getOrdersWorkCase);

export { getOrdersWorkController };
