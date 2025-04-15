import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaFineRepository from '@repositories/implementations/PrismaFineRepository';
import FineEditVerifications from './FineEditVerifications';
import FineEditCase from './FineEditCase';
import FineEditController from './FineEditController';

const condominiumRepository = new PrismaCondominiumsRepository();
const areaReservationRepository = new PrismaAreaReservationsRepository();
const commomnAreasRepository = new PrismaCommonAreasRepository();
const fineRepository = new PrismaFineRepository();

const fineEditVerifications = new FineEditVerifications();
const fineEditCase = new FineEditCase(
  condominiumRepository,
  areaReservationRepository,
  commomnAreasRepository,
  fineRepository
);

const fineEditController = new FineEditController(fineEditVerifications, fineEditCase);

export { fineEditController };
