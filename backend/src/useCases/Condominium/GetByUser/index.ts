import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumGetByUserVerifications from './CondominiumGetByUserVerifications';
import CondominiumGetByUserCase from './CondominiumGetByUserCase';
import CondominiumGetByUserController from './CondominiumGetByUserController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();

const condominiumGetByUserVerifications = new CondominiumGetByUserVerifications();
const condominiumGetByUserCase = new CondominiumGetByUserCase(condominiumRepository, addressesRepository);

const condominiumGetByUserController = new CondominiumGetByUserController(
  condominiumGetByUserVerifications,
  condominiumGetByUserCase
);

export { condominiumGetByUserController };
