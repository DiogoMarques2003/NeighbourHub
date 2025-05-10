import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaBudgetsRepository from '@repositories/implementations/PrismaBudgetsRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaVotingsRepository from '@repositories/implementations/PrismaVotingsRepository';
import GetVotingDetailsVerifications from './GetVotingDetailsVerifications';
import GetVotingDetailsCase from './GetVotingDetailsCase';
import GetVotingDetailsController from './GetVotingDetailsController';

const ordersRepository = new PrismaOrdersRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const addressRepository = new PrismaAddressesRepository();
const votingsRepository = new PrismaVotingsRepository();
const budgetsRepository = new PrismaBudgetsRepository();

const getVotingDetailsVerification = new GetVotingDetailsVerifications();
const getVotingDetailsCase = new GetVotingDetailsCase(
  ordersRepository,
  condominiumRepository,
  addressRepository,
  votingsRepository,
  budgetsRepository
);

const getVotingDetailsController = new GetVotingDetailsController(getVotingDetailsVerification, getVotingDetailsCase);

export { getVotingDetailsController };
