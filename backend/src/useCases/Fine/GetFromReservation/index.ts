import PrismaAddressesRepository from '@repositories/implementations/PrismaAddressesRepository';
import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaFineRepository from '@repositories/implementations/PrismaFineRepository';
import FineGetFromReservationVerification from './FineGetFromReservationVerification';
import FineGetFromReservationCase from './FineGetFromReservationCase';
import FineGetFromReservationController from './FineGetFromReservationController';

const condominiumRepository = new PrismaCondominiumsRepository();
const areaReservationRepository = new PrismaAreaReservationsRepository();
const commomnAreasRepository = new PrismaCommonAreasRepository();
const fineRepository = new PrismaFineRepository();
const addressRepository = new PrismaAddressesRepository();

const fineGetFromReservationVerification = new FineGetFromReservationVerification();
const fineGetFromReservationCase = new FineGetFromReservationCase(
  condominiumRepository,
  areaReservationRepository,
  commomnAreasRepository,
  fineRepository,
  addressRepository
);

const fineGetFromReservationController = new FineGetFromReservationController(
  fineGetFromReservationVerification,
  fineGetFromReservationCase
);

export { fineGetFromReservationController };
