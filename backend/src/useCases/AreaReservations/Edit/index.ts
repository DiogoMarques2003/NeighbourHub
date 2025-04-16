import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AreaReservationsEditVerifications from './AreaReservationsEditVerifications';
import AreaReservationsEditCase from './AreaReservationsEditCase';
import AreaReservationsEditController from './AreaReservationsEditController';

const condominiumsRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();
const addressesRepository = new PrismaAddressesRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();

const areaReservationsEditVerifications = new AreaReservationsEditVerifications();
const areaReservationsEditCase = new AreaReservationsEditCase(
  condominiumsRepository,
  commonAreasRepository,
  addressesRepository,
  areaReservationsRepository
);

const areaReservationsEditController = new AreaReservationsEditController(
  areaReservationsEditVerifications,
  areaReservationsEditCase
);

export { areaReservationsEditController };
