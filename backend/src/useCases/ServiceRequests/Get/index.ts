import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import ServiceRequestsGetVerifications from './ServiceRequestsGetVerifications';
import ServiceRequestsGetCase from './ServiceRequestsGetCase';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import ServiceRequestsGetController from './ServiceRequestsGetController';

const serviceRequestsRepository = new PrismaServiceRequestsRepository();
const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const ordersGetVerifications = new ServiceRequestsGetVerifications();
const ordersGetCase = new ServiceRequestsGetCase(
  serviceRequestsRepository,
  addressRepository,
  condominiumRepository
);

const serviceRequestsGetController = new ServiceRequestsGetController(
    ordersGetVerifications,
    ordersGetCase
);

export { serviceRequestsGetController };