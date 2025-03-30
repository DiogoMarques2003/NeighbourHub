import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import AddressesEditVerifications from './IAddressesEditVerifications';
import AddressesEditCase from './AddressesEditCase';
import AddressesEditController from './AddressesEditController';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';

const addressRepository = new PrismaAddressesRepository();
const usersRepository = new PrismaUsersRepository();
const condominiumRepository = new PrismaCondominiumsRepository();
const mailProvider = new ZohoMailProvider();

const addressEditVerifications = new AddressesEditVerifications();
const addressEditCase = new AddressesEditCase(
  addressRepository,
  condominiumRepository,
  usersRepository,
  mailProvider
);

const addressEditController = new AddressesEditController(
  addressEditVerifications,
  addressEditCase
);

export { addressEditController };
