import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsGetVerifications from './CondominiumPaymentsGetVerifications';
import CondominiumPaymentsGetCase from './CondominiumPaymentsGetCase';
import CondominiumPaymentsGetController from './CondominiumPaymentsGetController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();

const condominiumPaymentsGetVerifications = new CondominiumPaymentsGetVerifications();
const condominiumPaymentsGetCase = new CondominiumPaymentsGetCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository
);

const condominiumPaymentsGetController = new CondominiumPaymentsGetController(
  condominiumPaymentsGetVerifications,
  condominiumPaymentsGetCase
);

export { condominiumPaymentsGetController };
