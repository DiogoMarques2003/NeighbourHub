import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import EditServiceRequestsVerifications from './EditServiceRequestsVerifications';
import EditServiceRequestsCase from './EditServiceRequestsCase';
import EditServiceRequestsController from './EditServiceRequestsController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const serviceRequestRepository = new PrismaServiceRequestsRepository();

const editServiceRequestsVerifications = new EditServiceRequestsVerifications();
const editServiceRequestsCase = new EditServiceRequestsCase(
  servicesRepository,
  condominiumRepository,
  addressRepository,
  serviceRequestRepository
);

const editServiceRequestsController = new EditServiceRequestsController(
  editServiceRequestsVerifications,
  editServiceRequestsCase
);

export { editServiceRequestsController };
