import IAddressesRepository from "@repositories/IAddressesRepository";
import ICondominiumsRepository from "@repositories/ICondominiumsRepository";
import ICommonAreasRepository from "@repositories/ICommonAreasRepository";
import IAreaReservationsRepository from "@repositories/IAreaReservationsRepository";
import AppError from "@errors/AppError";
import IAreaReservationsGetDTO from "./IAreaReservationsGetDTO";

export default class AreaReservationsGetCase {
    constructor(
        private condominiumsRepository: ICondominiumsRepository,
        private areaReservationsRepository: IAreaReservationsRepository
    ) {}

    async execute(data: IAreaReservationsGetDTO) {
        const { userID, condID, status, pageSize, pageNumber } = data;

        const condominiumDB = await this.condominiumsRepository.findById(condID);
        if(!condominiumDB) throw new AppError("Condomínio não existe", 404);

        if(condominiumDB.adminId !== userID) throw new AppError("Não podes ver todas as reservas do condomínio porque não és admin", 403);

        const areaReservationsDB = await this.areaReservationsRepository.getAll(condID, pageSize, pageNumber, status);
        if (!areaReservationsDB.nRecords) return { data: [], pages: 0, actualPage: pageNumber, nRecords: areaReservationsDB.nRecords };

        const pages = Math.ceil(areaReservationsDB.nRecords / pageSize);
        if (pageNumber > pages) throw new AppError('Página inválida!', 404);

        return { data: areaReservationsDB.data, pages, actualPage: pageNumber, nRecords: areaReservationsDB.nRecords };
    }

}