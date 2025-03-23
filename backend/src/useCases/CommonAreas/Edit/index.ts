import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CommonAreasEditVerifications from './CommonAreasEditVerifications';
import CommonAreasEditCase from './CommonAreasEditCase';
import CommonAreasEditController from './CommonAreasEditController';

const condominiumRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const commonAreasEditVerifications = new CommonAreasEditVerifications();
const commonAreasEditCase = new CommonAreasEditCase(
  condominiumRepository,
  commonAreasRepository
);
const commonAreasEditController = new CommonAreasEditController(
  commonAreasEditVerifications,
  commonAreasEditCase
);

export { commonAreasEditController };
