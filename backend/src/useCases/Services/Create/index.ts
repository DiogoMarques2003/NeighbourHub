import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import ServicesCreateCase from './ServicesCreateCase';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesCreateVerifications from './ServicesCreateVerifications';
import ServicesCreateController from './ServicesCreateController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const userRepository = new PrismaUsersRepository();
const servicesRepository = new PrismaServicesRepository();

const servicesCreateVerifications = new ServicesCreateVerifications();
const servicesCreateCase = new ServicesCreateCase(
  condominiumRepository,
  addressesRepository,
  userRepository,
  servicesRepository
);
const servicesCreateController = new ServicesCreateController(servicesCreateVerifications, servicesCreateCase);

export { servicesCreateController };
