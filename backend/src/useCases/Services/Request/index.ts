import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesRequestVerifications from './ServicesRequestVerifications';
import ServicesRequestCase from './ServicesRequestCase';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import ServicesRequestController from './ServicesRequestController';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const serviceReqRepo = new PrismaServiceRequestsRepository();
const userRepository = new PrismaUsersRepository();
const mailProvider = new ZohoMailProvider();

const servicesRequestVerifications = new ServicesRequestVerifications();
const servicesRequestCase = new ServicesRequestCase(
  servicesRepository,
  condominiumRepository,
  addressRepository,
  serviceReqRepo,
  userRepository,
  mailProvider
);

const servicesRequestController = new ServicesRequestController(servicesRequestVerifications, servicesRequestCase);

export { servicesRequestController };
