import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CommonAreasGetVerifications from './CommonAreasGetVerifications';
import CommonAreasGetCase from './CommonAreasGetCase';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import CommonAreasGetController from './CommonAreasGetController';

const commonAreasRepository = new PrismaCommonAreasRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const commonareasGetVerification = new CommonAreasGetVerifications();
const commonAreasGetCase = new CommonAreasGetCase(
  commonAreasRepository,
  condominiumRepository,
  addressRepository
);

const commonAreasGetController = new CommonAreasGetController(
  commonareasGetVerification,
  commonAreasGetCase
);

export { commonAreasGetController };
