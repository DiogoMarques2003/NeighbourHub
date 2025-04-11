import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import AddressesDeleteVerifications from './AddressesDeleteVerifications';
import AddressesDeleteCase from './AddressesDeleteCase';
import AddressesDeleteController from './AddressesDeleteController';


const addressRepository = new PrismaAddressesRepository();
const condominiumRepository = new PrismaCondominiumsRepository();

const addressDeleteVerifications = new AddressesDeleteVerifications();
const addressDeleteCase = new AddressesDeleteCase(
  addressRepository,
  condominiumRepository
);
const addressDeleteController = new AddressesDeleteController(
    addressDeleteVerifications,
    addressDeleteCase
  );
  
  export { addressDeleteController };