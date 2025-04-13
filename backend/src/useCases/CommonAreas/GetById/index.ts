import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CommonAreasGetByIdVerifications from './CommonAreasGetByIdVerifications';
import CommonAreasGetByIdCase from './CommonAreasGetByIdCase';
import CommonAreasGetByIdController from './CommonAreasGetByIdController';

const commonAreasRepository = new PrismaCommonAreasRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();

const commonAreasGetByIdVerification = new CommonAreasGetByIdVerifications();
const commonAreasGetByIdCase = new CommonAreasGetByIdCase(
  commonAreasRepository,
  condominiumRepository,
  addressRepository
);

const commonAreasGetByIdController = new CommonAreasGetByIdController(
  commonAreasGetByIdVerification,
  commonAreasGetByIdCase
);

export { commonAreasGetByIdController };
