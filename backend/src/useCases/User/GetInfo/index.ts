import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserGetInfoCase from './UserGetInfoCase';
import UserGetInfoController from './UserGetInfoController';

const usersRepository = new PrismaUsersRepository();

const userGetInfoCase = new UserGetInfoCase(usersRepository);
const userGetInfoController = new UserGetInfoController(userGetInfoCase);

export { userGetInfoController };
