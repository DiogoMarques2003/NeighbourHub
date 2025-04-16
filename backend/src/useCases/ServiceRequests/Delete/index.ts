import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import DeleteServiceRequestsVerifications from './DeleteServiceRequestsVerifications';
import DeleteServiceRequestsCase from './DeleteServiceRequestsCase';
import DeleteServiceRequestsController from './DeleteServiceRequestsController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const serviceRequestRepository = new PrismaServiceRequestsRepository();

const deleteServiceRequestVerifications = new DeleteServiceRequestsVerifications();
const deleteServiceRequestCase = new DeleteServiceRequestsCase(
  servicesRepository,
  condominiumRepository,
  addressRepository,
  serviceRequestRepository
);

const deleteServiceRequestController = new DeleteServiceRequestsController(
  deleteServiceRequestVerifications,
  deleteServiceRequestCase
);

export { deleteServiceRequestController };
