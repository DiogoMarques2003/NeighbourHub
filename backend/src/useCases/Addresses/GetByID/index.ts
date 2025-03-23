import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AddressGetByIdVerifications from './AdressGetByIdVerifications';
import AddressGetByIdCase from './AddressGetByIdCase';
import AddresGetByIdController from './AddresGetByIdController';

const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const addressGetByIdVerifications = new AddressGetByIdVerifications();
const addressGetByIdCase = new AddressGetByIdCase(
  addressRepository,
  condominiumRepository
);

const addressGetByIdController = new AddresGetByIdController(
  addressGetByIdVerifications,
  addressGetByIdCase
);

export { addressGetByIdController };
