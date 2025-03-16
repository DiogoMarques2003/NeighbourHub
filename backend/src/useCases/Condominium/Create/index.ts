import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import CondominiumCreateVerifications from './CondominiumCreateVerifications';
import CondominiumCreateCase from './CondominiumCreateCase';
import CondominiumCreateController from './CondominiumCreateController';

const condominiumRepository = new PrismaCondominiumsRepository();
const usersRepository = new PrismaUsersRepository();

const condominiumCreateVerifications = new CondominiumCreateVerifications();
const condominiumCreateCase = new CondominiumCreateCase(
  condominiumRepository,
  usersRepository
);
const condominiumCreateController = new CondominiumCreateController(
  condominiumCreateVerifications,
  condominiumCreateCase
);

export { condominiumCreateController };
