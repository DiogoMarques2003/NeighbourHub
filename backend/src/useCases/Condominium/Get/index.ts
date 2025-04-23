import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumGetVerifications from './CondominiumGetVerifications';
import CondominiumGetCase from './CondominiumGetCase';
import CondominiumGetController from './CondominiumGetController';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const condominiumGetVerifications = new CondominiumGetVerifications();
const condominiumGetCase = new CondominiumGetCase(condominiumRepository, addressRepository);

const condominiumGetController = new CondominiumGetController(condominiumGetVerifications, condominiumGetCase);

export { condominiumGetController };
