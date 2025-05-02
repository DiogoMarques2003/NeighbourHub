import { isValidUUID } from "@shared/verifications";
import IAreaReservationsGetDTO from "./IAreaReservationsGetDTO";
import AppError from "@errors/AppError";
import { STATUS_RESERV } from "@constants/status";

export default class AreaReservationsGetVerifications {
    execute(data: IAreaReservationsGetDTO) {
        const { condID, status, bGetCondominiumReservations, pageSize, pageNumber } = data;
        
        if (!condID || typeof condID !== 'string' || !isValidUUID(condID)) throw new AppError('Condomínio inválido', 400);

        if (status && ( typeof status !== 'string' || !STATUS_RESERV.includes(status))) throw new AppError('Status inválido', 400);

        if(bGetCondominiumReservations && (typeof bGetCondominiumReservations !== "boolean")) throw new AppError("Campo bGetCondominiumReservations tem que ser booleano", 400);

        if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
        if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;
        if (!bGetCondominiumReservations) data.bGetCondominiumReservations = false;
    }
}