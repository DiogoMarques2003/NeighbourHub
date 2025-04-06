import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesGetAllVerifications from './ServicesGetAllVerifications';
import ServicesGetAllCase from './ServicesGetAllCase';
import ServicesGetAllController from './ServicesGetAllController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const servicesGetAllVerifications = new ServicesGetAllVerifications();
const servicesGetAllCase = new ServicesGetAllCase(servicesRepository, condominiumRepository);

const servicesGetAllController = new ServicesGetAllController(servicesGetAllVerifications, servicesGetAllCase);

export { servicesGetAllController };
