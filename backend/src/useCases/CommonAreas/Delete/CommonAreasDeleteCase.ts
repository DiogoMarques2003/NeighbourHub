import ICommonAreasRepository from "@repositories/ICommonAreasRepository";
import ICondominiumsRepository from "@repositories/ICondominiumsRepository";
import ICommonAreasDeleteDTO from "./ICommonAreasDeleteDTO";
import AppError from "@errors/AppError";

export default class CommonAreasDeleteCase {
    constructor(
        private condomoniumsRepository: ICondominiumsRepository,
        private commonAreasRepository: ICommonAreasRepository
    ) {}

    async execute(data: ICommonAreasDeleteDTO): Promise<Boolean> {
        const { commonAreaId, condominiumId, userId } = data;

        const condominiumDb = await this.condomoniumsRepository.findById(condominiumId);
        if (!condominiumDb) throw new AppError("Condomínio não existe", 404);
        if (userId !== condominiumDb.adminId) throw new AppError("Não podes apagar as áreas comuns deste condomínio", 403);

        const commonAreaDb = await this.commonAreasRepository.findById(commonAreaId);
        if (!commonAreaDb) throw new AppError("Área comum não existe", 404);
        if (commonAreaDb.condominiumId !== condominiumId) throw new AppError("Área comum não pertence a este condomínio", 403);

        return this.commonAreasRepository.delete(commonAreaId);
    }
}