import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import OrdersGetVerifications from './OrdersGetVerifications';
import OrdersGetCase from './OrdersGetCase';
import OrdersGetController from './OrdersGetController';

const ordersRepository = new PrismaOrdersRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const ordersGetVerifications = new OrdersGetVerifications();
const ordersGetCase = new OrdersGetCase(
  ordersRepository,
  condominiumRepository,
  addressRepository
);

const ordersGetController = new OrdersGetController(
  ordersGetVerifications,
  ordersGetCase
);

export { ordersGetController };
