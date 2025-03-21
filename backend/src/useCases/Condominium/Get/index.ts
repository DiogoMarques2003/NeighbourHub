import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumGetVerifications from './CondominiumGetVerifications';
import CondominiumGetCase from './CondominiumGetCase';
import CondominiumGetController from './CondominiumGetController';

const condominiumRepository = new PrismaCondominiumsRepository();

const condominiumGetVerifications = new CondominiumGetVerifications();
const condominiumGetCase = new CondominiumGetCase(condominiumRepository);

const condominiumGetController = new CondominiumGetController(
  condominiumGetVerifications,
  condominiumGetCase
);

export { condominiumGetController };
