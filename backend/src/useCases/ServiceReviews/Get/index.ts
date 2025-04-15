import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceReviewsRepository from '@repositories/implementations/PrismaServiceReviewsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServiceReviewsGetVerifications from './ServiceReviewsGetVerifications';
import ServiceReviewsGetCase from './ServiceReviewsGetCase';
import ServiceReviewsGetController from './ServiceReviewsGetController';

const condominiumRepository = new PrismaCondominiumsRepository();
const serviceRepository = new PrismaServicesRepository();
const serviceReviewsRepository = new PrismaServiceReviewsRepository();
const addressRepository = new PrismaAddressesRepository();

const serviceReviewsGetVerifications = new ServiceReviewsGetVerifications();
const serviceReviewsGetCase = new ServiceReviewsGetCase(
  condominiumRepository,
  serviceRepository,
  serviceReviewsRepository,
  addressRepository
);

const serviceReviewsGetController = new ServiceReviewsGetController(
  serviceReviewsGetVerifications,
  serviceReviewsGetCase
);

export { serviceReviewsGetController };
