import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaFineRepository from '@repositories/implementations/PrismaFineRepository';
import FineDeleteVerifications from './FineDeleteVerifications';
import FineDeleteCase from './FineDeleteCase';
import FineDeleteController from './FineDeleteController';

const condominiumRepository = new PrismaCondominiumsRepository();
const areaReservationRepository = new PrismaAreaReservationsRepository();
const commomnAreasRepository = new PrismaCommonAreasRepository();
const fineRepository = new PrismaFineRepository();

const fineDeleteVerifications = new FineDeleteVerifications();
const fineDeleteCase = new FineDeleteCase(
  condominiumRepository,
  areaReservationRepository,
  commomnAreasRepository,
  fineRepository
);

const fineDeleteController = new FineDeleteController(fineDeleteVerifications, fineDeleteCase);

export { fineDeleteController };
