import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumPaymentsRepository from '@repositories/implementations/PrismaCondominiumPaymentsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import CondominiumPaymentsGetByIdVerifications from './CondominiumPaymentsGetByIdVerifications';
import CondominiumPaymentsGetByIdCase from './CondominiumPaymentsGetByIdCase';
import CondominiumPaymentsGetByIdController from './CondominiumPaymentsGetByIdController';

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const condominiumPaymentsRepository = new PrismaCondominiumPaymentsRepository();

const condominiumPaymentsGetByIdVerifications = new CondominiumPaymentsGetByIdVerifications();
const condominiumPaymentsGetByIdCase = new CondominiumPaymentsGetByIdCase(
  condominiumRepository,
  addressesRepository,
  condominiumPaymentsRepository
);

const condominiumPaymentsGetByIdController = new CondominiumPaymentsGetByIdController(
  condominiumPaymentsGetByIdVerifications,
  condominiumPaymentsGetByIdCase
);

export { condominiumPaymentsGetByIdController };
