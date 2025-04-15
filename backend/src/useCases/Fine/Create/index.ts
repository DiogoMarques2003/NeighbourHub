import PrismaAreaReservationsRepository from '@repositories/implementations/PrismaAreaReservationsRepository';
import PrismaCommonAreasRepository from '@repositories/implementations/PrismaCommonAreasRepository';
import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaFineRepository from '@repositories/implementations/PrismaFineRepository';
import FineCreateVerifications from './FineCreateVerifications';
import FineCreateCase from './FineCreateCase';
import FineCreateController from './FineCreateController';
import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';

const condominiumRepository = new PrismaCondominiumsRepository();
const areaReservationRepository = new PrismaAreaReservationsRepository();
const commomnAreasRepository = new PrismaCommonAreasRepository();
const fineRepository = new PrismaFineRepository();
const mailProvider = new ZohoMailProvider();
const userProvider = new PrismaUsersRepository();

const fineCreateVerifications = new FineCreateVerifications();
const fineCreateCase = new FineCreateCase(
  condominiumRepository,
  areaReservationRepository,
  commomnAreasRepository,
  fineRepository,
  mailProvider,
  userProvider
);

const fineCreateController = new FineCreateController(fineCreateVerifications, fineCreateCase);

export { fineCreateController };
