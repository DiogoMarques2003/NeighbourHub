import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserEditVerifications from './UserEditVerifications';
import UserEditCase from './UserEditCase';
import UserEditController from './UserEditController';

const userRepository = new PrismaUsersRepository();

const userEditVerifications = new UserEditVerifications();
const userEditCase = new UserEditCase(userRepository);
const userEditController = new UserEditController(userEditVerifications, userEditCase);

export { userEditController };
