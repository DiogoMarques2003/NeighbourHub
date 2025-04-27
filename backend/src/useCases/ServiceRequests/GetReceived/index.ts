import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import ServiceRequestsReceivedGetVerifications from './ServiceRequestsReceivedGetVerifications';
import ServiceRequestsReceivedGetCase from './ServiceRequestsReceivedGetCase';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import ServiceRequestsReceivedGetController from './ServiceRequestsReceivedGetController';

const serviceRequestsReceivedRepository = new PrismaServiceRequestsRepository();
const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const ordersGetVerifications = new ServiceRequestsReceivedGetVerifications();
const ordersGetCase = new ServiceRequestsReceivedGetCase(
  serviceRequestsReceivedRepository,
  addressRepository,
  condominiumRepository
);

const serviceRequestsReceivedGetController = new ServiceRequestsReceivedGetController(
    ordersGetVerifications,
    ordersGetCase
);

export { serviceRequestsReceivedGetController };