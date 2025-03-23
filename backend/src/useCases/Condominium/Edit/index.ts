import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumEditVerifications from './CondominiumEditVerifications';
import CondominiumEditCase from './CondominiumEditCase';
import CondominiumEditController from './CondominiumEditController';

const condominiumRepository = new PrismaCondominiumsRepository();

const condominiumEditVerifications = new CondominiumEditVerifications();
const condominiumEditCase = new CondominiumEditCase(
  condominiumRepository
);
const condominiumEditController = new CondominiumEditController(
  condominiumEditVerifications,
  condominiumEditCase
);

export { condominiumEditController };