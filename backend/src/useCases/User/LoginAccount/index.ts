import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserLoginAccountVerifications from './UserLoginAccountVerifications';
import UserLoginAccountCase from './UserLoginAccountCase';
import UserLoginAccountController from './UserLoginAccountController';

const usersRepository = new PrismaUsersRepository();

const userLoginAccountVerifications = new UserLoginAccountVerifications();
const userLoginAccountCase = new UserLoginAccountCase(usersRepository);
const userLoginAccountController = new UserLoginAccountController(
  userLoginAccountVerifications,
  userLoginAccountCase
);

export { userLoginAccountController };
