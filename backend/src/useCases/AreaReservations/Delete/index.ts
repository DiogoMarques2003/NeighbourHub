import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AreaReservationsDeleteVerifications from './AreaReservationsDeleteVerifications';
import AreaReservationsDeleteCase from './AreaReservationsDeleteCase';
import AreaReservationsDeleteController from './AreaReservationsDeleteController';

const condominiumsRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();
const addressesRepository = new PrismaAddressesRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();

const areaReservationsDeleteVerifications = new AreaReservationsDeleteVerifications();
const areaReservationsDeleteCase = new AreaReservationsDeleteCase(
  condominiumsRepository,
  commonAreasRepository,
  addressesRepository,
  areaReservationsRepository
);

const areaReservationsDeleteController = new AreaReservationsDeleteController(
  areaReservationsDeleteVerifications,
  areaReservationsDeleteCase
);

export { areaReservationsDeleteController };
