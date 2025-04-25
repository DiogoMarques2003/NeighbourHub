import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import ServicesGetByIdVerifications from './ServicesGetByIdVerifications';
import ServicesGetByIdCase from './ServicesGetByIdCase';
import ServicesGetByIdController from './ServicesGetByIdController';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaServiceReviewsRepository from '@repositories/implementations/PrismaServiceReviewsRepository';

const servicesRepository = new PrismaServicesRepository();
const servicesReviewRepository = new PrismaServiceReviewsRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const servicesGetByIdVerifications = new ServicesGetByIdVerifications();
const servicesGetByIdCase = new ServicesGetByIdCase(servicesRepository, servicesReviewRepository, condominiumRepository, addressRepository);

const servicesGetByIdController = new ServicesGetByIdController(servicesGetByIdVerifications, servicesGetByIdCase);

export { servicesGetByIdController };
