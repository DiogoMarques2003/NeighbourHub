import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import OrdersEditVerifications from './OrdersEditVerifications';
import OrdersEditCase from './OrdersEditCase';
import OrdersEditController from './OrdersEditController';

const ordersRepository = new PrismaOrdersRepository();
const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const ordersEditVerifications = new OrdersEditVerifications();
const ordersEditCase = new OrdersEditCase(ordersRepository, addressRepository, condominiumRepository);

const ordersEditController = new OrdersEditController(ordersEditVerifications, ordersEditCase);

export { ordersEditController };
