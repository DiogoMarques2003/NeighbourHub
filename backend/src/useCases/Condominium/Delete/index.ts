import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumDeleteVerifications from './CondominiumDeleteVerifications';
import CondominiumDeleteCase from './CondominiumDeleteCase';
import CondominiumDeleteController from './CondominiumDeleteController';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaOrderWorksRepository from '@repositories/implementations/PrismaOrderWorksRepository';

const condominiumRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();
const orderWorksRepository = new PrismaOrderWorksRepository();

const condominiumDeleteVerifications = new CondominiumDeleteVerifications();
const condominiumDeleteCase = new CondominiumDeleteCase(
  condominiumRepository,
  commonAreasRepository,
  orderWorksRepository
);
const condominiumDeleteController = new CondominiumDeleteController(
  condominiumDeleteVerifications,
  condominiumDeleteCase
);

export { condominiumDeleteController };
