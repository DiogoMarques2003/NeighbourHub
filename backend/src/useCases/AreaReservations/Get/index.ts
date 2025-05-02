import PrismaCondominiumsRepository from "@repositories/implementations/PrismaCondominiumsRepository";
import AreaReservationsGetCase from "./AreaReservationsGetCase";
import AreaReservationsGetVerifications from "./AreaReservationsGetVerifications";
import PrismaAreaReservationsRepository from "@repositories/implementations/PrismaAreaReservationsRepository";
import AreaReservationsGetController from "./AreaReservationsGetController";

const condominiumRepository = new PrismaCondominiumsRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();

const areaReservationsGetVerifications = new AreaReservationsGetVerifications;
const areaReservationsGetCase = new AreaReservationsGetCase(condominiumRepository, areaReservationsRepository);

const areaReservationsGetController = new AreaReservationsGetController(areaReservationsGetVerifications, areaReservationsGetCase);

export { areaReservationsGetController };