import PrismaVotingsRepository from '@repositories/implementations/PrismaVotingsRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import VotingCreateVerifications from './VotingCreateVerifications';
import VotingCreateCase from './VotingCreateCase';
import VotingCreateController from './VotingCreateController';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaBudgetsRepository from '@repositories/implementations/PrismaBudgetsRepository';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';

const votingsRepository = new PrismaVotingsRepository();
const addressRepository = new PrismaAddressesRepository();
const ordersRepository = new PrismaOrdersRepository();
const budgetsRepository = new PrismaBudgetsRepository();

const votingCreateVerifications = new VotingCreateVerifications();
const votingCreateCase = new VotingCreateCase(
  votingsRepository,
  addressRepository,
  ordersRepository,
  budgetsRepository
);
const voteCreateController = new VotingCreateController(
  votingCreateVerifications,
  votingCreateCase
);

export { voteCreateController };
