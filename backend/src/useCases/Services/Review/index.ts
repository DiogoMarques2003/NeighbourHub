import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaServiceRequestsRepository from '@repositories/implementations/PrismaServiceRequestsRepository';
import PrismaServiceReviewsRepository from '@repositories/implementations/PrismaServiceReviewsRepository';
import PrismaServicesRepository from '@repositories/implementations/PrismaServicesRepository';
import ServicesReviewVerifications from './IServicesReviewVerifications';
import ServicesReviewCase from './IServicesReviewCase';
import ServicesReviewController from './IServicesReviewController';

const servicesRepository = new PrismaServicesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const serviceReqRepo = new PrismaServiceRequestsRepository();
const serviceReviewRepo = new PrismaServiceReviewsRepository();

const servicesReviewVerification = new ServicesReviewVerifications();
const servicesReviewCase = new ServicesReviewCase(
  servicesRepository,
  condominiumRepository,
  addressRepository,
  serviceReviewRepo,
  serviceReqRepo
);

const servicesReviewController = new ServicesReviewController(servicesReviewVerification, servicesReviewCase);

export { servicesReviewController };
