import { isValidUUID } from "@shared/verifications";
import IServiceRequestsGetDTO from "./IServiceRequestsGetDTO";
import AppError from "@errors/AppError";

export default class ServiceRequestsGetVerifications {
    execute(data: IServiceRequestsGetDTO) {
        const { condominiumID, pageNumber, pageSize } = data;

        if (
            !condominiumID ||
            typeof condominiumID !== 'string' ||
            !isValidUUID(condominiumID)
          )
            throw new AppError('Id de condomínio inválido!', 400);
        
        if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

        if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
    }
}