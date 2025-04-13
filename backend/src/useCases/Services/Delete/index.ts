import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesDeleteVerifications from './ServicesDeleteVerifications';
import ServicesDeleteCase from './ServicesDeleteCase';
import ServicesDeleteController from './ServicesDeleteController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const servicesDeleteVerifications = new ServicesDeleteVerifications();
const servicesDeleteCase = new ServicesDeleteCase(servicesRepository, condominiumRepository, addressRepository);

const servicesDeleteController = new ServicesDeleteController(servicesDeleteVerifications, servicesDeleteCase);

export { servicesDeleteController };
