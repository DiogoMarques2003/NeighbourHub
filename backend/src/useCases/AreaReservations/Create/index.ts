import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AreaReservationsCreateCase from './AreaReservationsCreateCase';
import AreaReservationsVerifications from './AreaReservationsCreateVerifications';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';
import areaReservationCreateController from './AreaReservationsCreateController';

const condominiumsRepository = new PrismaCondominiumsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();
const addressesRepository = new PrismaAddressesRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();
const userRepository = new PrismaUsersRepository();
const mailProvider = new ZohoMailProvider();

const areaReservationsCreateVerifications = new AreaReservationsVerifications();
const areaReservationsCase = new AreaReservationsCreateCase(
  condominiumsRepository,
  commonAreasRepository,
  addressesRepository,
  areaReservationsRepository,
  userRepository,
  mailProvider
);
const areaReservationsController = new areaReservationCreateController(
  areaReservationsCreateVerifications,
  areaReservationsCase
);

export { areaReservationsController };
