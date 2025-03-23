import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import AddressGetVerifications from './AddressGetVerifications';
import AddressGetCase from './AddressGetCase';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AddressesGetController from './AddressGetController';

const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const addressGetVerifications = new AddressGetVerifications();
const addressGetCase = new AddressGetCase(
  addressRepository,
  condominiumRepository
);

const addressGetController = new AddressesGetController(
  addressGetVerifications,
  addressGetCase
);

export { addressGetController };
