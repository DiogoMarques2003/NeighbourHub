import ICondominiumsRepository from "@repositories/ICondominiumsRepository";
import IServiceRequestsRepository from "@repositories/IServiceRequestsRepository";
import IServiceRequestsGetDTO from "./IServiceRequestsGetDTO";
import ServiceRequests from "@entities/ServiceRequests";
import AppError from "@errors/AppError";
import IUsersRepository from "@repositories/IUsersRepository";
import IAddressesRepository from "@repositories/IAddressesRepository";

export default class ServiceRequestsGetCase {
    constructor(
        private servicesRequestsRepository: IServiceRequestsRepository,
        private addressRepository: IAddressesRepository,
        private condominiumRepository: ICondominiumsRepository
    ) {}

    async execute(data: IServiceRequestsGetDTO): Promise<DataPagination<ServiceRequests[]>> {
        const { userID, condominiumID, pageNumber, pageSize } = data;

        const condDb = await this.condominiumRepository.findById(condominiumID);
        if(!condDb) throw new AppError('Condomínio não existe!', 404);

        const userAddress = await this.addressRepository.getByUserAndCond(userID, condominiumID);
        if (!userAddress) throw new AppError('Utilizador não pertence ao condomínio!', 403);

        const count = await this.servicesRequestsRepository.count(userID, condominiumID);
        if(!count) return { data: [], pages: 0, actualPage: pageNumber, nRecords: count }
        
        const pages = Math.ceil(count / pageSize);
        if (pageNumber > pages) throw new AppError('Página inválida!', 404);

        const serviceRequests = await this.servicesRequestsRepository.getWithPagination(userID, condominiumID, pageSize, pageNumber);

        return { data: serviceRequests, pages, actualPage: pageNumber, nRecords: count }
    }
}