import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import OrdersGetByIdVerifications from './OrdersGetByIdVerifications';
import OrdersGetByIdCase from './OrdersGetByIdCase';
import OrdersGetByIdController from './OrdersGetByIdController';

const ordersRepository = new PrismaOrdersRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const ordersGetByIdVerification = new OrdersGetByIdVerifications();
const ordersGetByIdCase = new OrdersGetByIdCase(ordersRepository, condominiumRepository, addressRepository);

const ordersGetByIdController = new OrdersGetByIdController(ordersGetByIdVerification, ordersGetByIdCase);

export { ordersGetByIdController };
