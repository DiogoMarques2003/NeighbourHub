import PrismaCondominiumsRepository from "@repositories/implementations/PrismaCondominiumsRepository";
import AreaReservationsGetCase from "./AreaReservationsGetCase";
import AreaReservationsGetVerifications from "./AreaReservationsGetVerifications";
import PrismaAreaReservationsRepository from "@repositories/implementations/PrismaAreaReservationsRepository";
import AreaReservationsGetController from "./AreaReservationsGetController";
import PrismaAddressesRepository from "@repositories/implementations/PrismaAddressesRepository";

const condominiumRepository = new PrismaCondominiumsRepository();
const addressesRepository = new PrismaAddressesRepository();
const areaReservationsRepository = new PrismaAreaReservationsRepository();

const areaReservationsGetVerifications = new AreaReservationsGetVerifications;
const areaReservationsGetCase = new AreaReservationsGetCase(condominiumRepository, addressesRepository, areaReservationsRepository);

const areaReservationsGetController = new AreaReservationsGetController(areaReservationsGetVerifications, areaReservationsGetCase);

export { areaReservationsGetController };