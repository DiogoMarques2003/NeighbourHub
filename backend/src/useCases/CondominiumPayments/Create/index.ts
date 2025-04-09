import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsCreateVerifications from './CondominiumPaymentsCreateVerifications';
import CondominiumPaymentsCreateCreateCase from './CondominiumPaymentsCreateCase';
import CondominiumPaymentsCreateController from './CondominiumPaymentsCreateController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();
const commonAreasRepository = new PrismaCommonAreasRepository();

const condominiumPaymentsCreateVerifications = new CondominiumPaymentsCreateVerifications();
const condominiumPaymentsCreateCase = new CondominiumPaymentsCreateCreateCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository,
  areaReservationsRepository,
  commonAreasRepository
);
const condominiumPaymentsCreateController = new CondominiumPaymentsCreateController(
  condominiumPaymentsCreateVerifications,
  condominiumPaymentsCreateCase
);

export { condominiumPaymentsCreateController };
