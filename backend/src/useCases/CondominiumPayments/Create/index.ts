import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsVerifications from './CondominiumPaymentsVerifications';
import CondominiumPaymentsCreateCase from './CondominiumPaymentsCase';
import CondominiumPaymentsCreateController from './CondominiumPaymentsController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const condominiumPaymentsVerifications = new CondominiumPaymentsVerifications();
const condominiumPaymentsCase = new CondominiumPaymentsCreateCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository,
  areaReservationsRepository,
  commonAreasRepository
);
const condominiumPaymentsCreateController = new CondominiumPaymentsCreateController(
  condominiumPaymentsVerifications,
  condominiumPaymentsCase
);

export { condominiumPaymentsCreateController };
