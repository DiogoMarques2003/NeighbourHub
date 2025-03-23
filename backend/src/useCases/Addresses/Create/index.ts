import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import AddressesCreateVerifications from './AddressesCreateVerifications';
import AddressesCreateCase from './AddressesCreateCase';
import AddressesCreateController from './AddressesCreateController';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';

const addressRepository = new PrismaAddressesRepository();
const usersRepository = new PrismaUsersRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const addressCreateVerifications = new AddressesCreateVerifications();
const addressCreateCase = new AddressesCreateCase(
  addressRepository,
  condominiumRepository,
  usersRepository
);

const addressCreateController = new AddressesCreateController(
  addressCreateVerifications,
  addressCreateCase
);

export { addressCreateController };
