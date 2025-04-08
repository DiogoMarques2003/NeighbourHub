import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsDeleteVerifications from './CondominiumPaymentsDeleteVerifications';
import CondominiumPaymentsDeleteCase from './CondominiumPaymentsDeleteCase';
import CondominiumPaymentsDeleteController from './CondominiumPaymentsDeleteController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();

const condominiumPaymentsDeleteVerifications = new CondominiumPaymentsDeleteVerifications();
const condominiumPaymentsDeleteCase = new CondominiumPaymentsDeleteCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository
);

const condominiumPaymentsDeleteController = new CondominiumPaymentsDeleteController(
  condominiumPaymentsDeleteVerifications,
  condominiumPaymentsDeleteCase
);

export { condominiumPaymentsDeleteController };
