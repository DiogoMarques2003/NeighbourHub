import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CommonAreasCreateController from './CommonAreasCreateController';
import CommonAreasCreateCase from './CommonAreasCreateCase';
import CommonAreasCreateVerifications from './CommonAreasCreateVerifications';

const condominiumRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const commonAreasCreateVerifications = new CommonAreasCreateVerifications();
const commonAreasCreateCase = new CommonAreasCreateCase(
  condominiumRepository,
  commonAreasRepository
);
const commonAreasCreateController = new CommonAreasCreateController(
  commonAreasCreateVerifications,
  commonAreasCreateCase
);

export { commonAreasCreateController };
