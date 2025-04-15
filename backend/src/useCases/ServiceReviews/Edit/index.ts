import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import PrismaServiceReviewsRepository from '@repositories/implementations/PrismaServiceReviewsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServiceReviewsEditVerifications from './ServiceReviewsEditVerifications';
import ServiceReviewsEditCase from './ServiceReviewsEditCase';
import ServiceReviewsEditController from './ServiceReviewsEditControllers';

const condominiumRepository = new PrismaCondominiumsRepository();
const servicesRepository = new PrismaServicesRepository();
const servicesRequestsRepository = new PrismaServiceRequestsRepository();
const serviceReviewsRepository = new PrismaServiceReviewsRepository();
const addressRepository = new PrismaAddressesRepository();

const serviceReviewsEditVerifications = new ServiceReviewsEditVerifications();
const serviceReviewsEditCase = new ServiceReviewsEditCase(
  condominiumRepository,
  servicesRepository,
  servicesRequestsRepository,
  serviceReviewsRepository,
  addressRepository
);

const serviceReviewsEditController = new ServiceReviewsEditController(
  serviceReviewsEditVerifications,
  serviceReviewsEditCase
);

export { serviceReviewsEditController };
