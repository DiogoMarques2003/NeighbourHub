import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CommonAreasDeleteVerifications from './CommonAreasDeleteVerifications';
import CommonAreasDeleteCase from './CommonAreasDeleteCase';
import CommonAreasDeleteController from './CommonAreasDeleteController';

const condominiumRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const commonAreasDeleteVerifications = new CommonAreasDeleteVerifications();
const commonAreasDeleteCase = new CommonAreasDeleteCase(condominiumRepository, commonAreasRepository);

const commonAreasDeleteController = new CommonAreasDeleteController(
  commonAreasDeleteVerifications,
  commonAreasDeleteCase
);

export { commonAreasDeleteController };
