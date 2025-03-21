import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import CondominiumDeleteVerifications from './CondominiumDeleteVerifications';
import CondominiumDeleteCase from './CondominiumDeleteCase';
import CondominiumDeleteController from './CondominiumDeleteController';

const condominiumRepository = new PrismaCondominiumsRepository();
const usersRepository = new PrismaUsersRepository();

const condominiumDeleteVerifications = new CondominiumDeleteVerifications();
const condominiumDeleteCase = new CondominiumDeleteCase(
  condominiumRepository,
  usersRepository
);
const condominiumDeleteController = new CondominiumDeleteController(
  condominiumDeleteVerifications,
  condominiumDeleteCase
);

export { condominiumDeleteController };
