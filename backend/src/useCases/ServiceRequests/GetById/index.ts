import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import GetByIdServiceRequestsVerifications from './GetByIdServiceRequestsVerifications';
import GetByIdServiceRequestsCase from './GetByIdServiceRequestsCase';
import GetByIdServiceRequestsController from './GetByIdServiceRequestsController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const serviceRequestRepository = new PrismaServiceRequestsRepository();

const getByIdServiceRequestsVerifications = new GetByIdServiceRequestsVerifications();
const getByIdServiceRequestsCase = new GetByIdServiceRequestsCase(
  servicesRepository,
  condominiumRepository,
  addressRepository,
  serviceRequestRepository
);

const getByIdServiceRequestsController = new GetByIdServiceRequestsController(
  getByIdServiceRequestsVerifications,
  getByIdServiceRequestsCase
);

export { getByIdServiceRequestsController };
