import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsEditVerifications from './CondominiumPaymentsEditVerifications';
import CondominiumPaymentsEditCase from './CondominiumPaymentsEditCase';
import CondominiumPaymentsEditController from './CondominiumPaymentsEditController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const condominiumPaymentsEditVerifications = new CondominiumPaymentsEditVerifications();
const condominiumPaymentsEditCase = new CondominiumPaymentsEditCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository,
  areaReservationsRepository,
  commonAreasRepository
);

const condominiumPaymentsEditController = new CondominiumPaymentsEditController(
  condominiumPaymentsEditVerifications,
  condominiumPaymentsEditCase
);

export { condominiumPaymentsEditController };
