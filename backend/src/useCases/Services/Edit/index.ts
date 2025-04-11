import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesEditVerifications from './IServicesEditVerifications';
import ServicesEditCase from './IServicesEditCase';
import ServicesEditController from './IServicesEditController';

const servicesRepository = new PrismaServicesRepository();
const condRepository = new PrismaCondominiumsRepository();

const serviceEditVerifications = new ServicesEditVerifications();
const serviceEditCase = new ServicesEditCase(condRepository, servicesRepository);

const serviceEditController = new ServicesEditController(serviceEditVerifications, serviceEditCase);

export { serviceEditController };
