import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserCreateAccountVerifications from './UserCreateAccountVerifications';
import UserCreateAccountcase from './UserCreateAccountCase';
import UserCreateAccountController from './UserCreateAccountController';

const usersRepository = new PrismaUsersRepository();

const userCreateAccountVerifications = new UserCreateAccountVerifications();
const userCreateAccountCase = new UserCreateAccountcase(usersRepository);
const userCreateAccountController = new UserCreateAccountController(
  userCreateAccountVerifications,
  userCreateAccountCase
);

export { userCreateAccountController };
