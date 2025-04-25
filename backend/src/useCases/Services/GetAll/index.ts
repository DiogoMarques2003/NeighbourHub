import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesGetAllVerifications from './ServicesGetAllVerifications';
import ServicesGetAllCase from './ServicesGetAllCase';
import ServicesGetAllController from './ServicesGetAllController';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaServiceReviewsRepository from '@repositories/implementations/PrismaServiceReviewsRepository';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();

const servicesGetAllVerifications = new ServicesGetAllVerifications();
const servicesGetAllCase = new ServicesGetAllCase(servicesRepository, condominiumRepository, addressesRepository);

const servicesGetAllController = new ServicesGetAllController(servicesGetAllVerifications, servicesGetAllCase);

export { servicesGetAllController };
