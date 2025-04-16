import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AreaReservationsGetByIdVerifications from './AreaReservationsGetByIdVerifications';
import AreaReservationsGetByIdCase from './AreaReservationsGetByIdCase';
import AreaReservationsGetByIdController from './AreaReservationsGetByIdController';

const condominiumsRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();
const addressesRepository = new PrismaAddressesRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();

const areaReservationsGetByIdVerifications = new AreaReservationsGetByIdVerifications();
const areaReservationsDeleteCase = new AreaReservationsGetByIdCase(
  condominiumsRepository,
  commonAreasRepository,
  addressesRepository,
  areaReservationsRepository
);

const areaReservationsGetByIdController = new AreaReservationsGetByIdController(
  areaReservationsGetByIdVerifications,
  areaReservationsDeleteCase
);

export { areaReservationsGetByIdController };
