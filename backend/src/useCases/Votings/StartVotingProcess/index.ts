import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaBudgetsRepository from '@repositories/implementations/PrismaBudgetsRepository';
import MailProvider from '@providers/implementations/ZohoMailProvider';
import VotingCreateVerifications from './StartVotingProcessVerifications';
import VotingCreateCase from './StartVotingProcessCase';
import VotingCreateController from './StartVotingProcessController';

const ordersRepository = new PrismaOrdersRepository();
const condominiumsRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const budgetsRepository = new PrismaBudgetsRepository();
const mailProvider = new MailProvider();

const votingCreateVerifications = new VotingCreateVerifications();

const votingCreateCase = new VotingCreateCase(
    ordersRepository,
    condominiumsRepository,
    addressesRepository,
    budgetsRepository,
    mailProvider
);

const votingCreateController = new VotingCreateController(
    votingCreateVerifications,
    votingCreateCase
);

export { votingCreateController };
