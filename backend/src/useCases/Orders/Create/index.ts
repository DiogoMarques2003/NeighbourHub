import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';
import MockMailProvider from '@providers/implementations/MockMailProvider';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import OrdersCreateVerifications from './OrdersCreateVerifications';
import OrdersCreateCase from './OrdersCreateCase';
import OrdersCreateController from './OrdersCreateController';

const ordersRepository = new PrismaOrdersRepository();
const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const userRepository = new PrismaUsersRepository();

// perante testes de integração não usar o email provider real
const mailProvider = process.env.NODE_ENV === 'test' 
  ? new MockMailProvider() 
  : new ZohoMailProvider();

const ordersCreateVerification = new OrdersCreateVerifications();
const ordersCreateCase = new OrdersCreateCase(
  ordersRepository,
  addressRepository,
  condominiumRepository,
  userRepository,
  mailProvider
);

const ordersCreateController = new OrdersCreateController(
  ordersCreateVerification,
  ordersCreateCase
);

export { ordersCreateController };
