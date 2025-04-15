import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaFineRepository from '@repositories/implementations/PrismaFineRepository';
import FineGetVerifications from './FineGetVerifications';
import FineGetCase from './FineGetCase';
import FineGetController from './FineGetController';

const condominumRepository = new PrismaCondominiumsRepository();
const fineRepository = new PrismaFineRepository();
const addressRepository = new PrismaAddressesRepository();

const fineGetVerifications = new FineGetVerifications();
const fineGetCase = new FineGetCase(condominumRepository, fineRepository, addressRepository);

const fineGetController = new FineGetController(fineGetVerifications, fineGetCase);

export { fineGetController };
