import ICondominiumsRepository from "@repositories/ICondominiumsRepository";
import IServiceRequestsRepository from "@repositories/IServiceRequestsRepository";
import AppError from "@errors/AppError";
import IAddressesRepository from "@repositories/IAddressesRepository";
import IServiceRequestsReceivedGetDTO from "./IServiceRequestsReceivedGetDTO";
import ServiceRequestsWithUserData from "src/@types/ServiceRequestsWithUserData";
import generatePathToFile from '@shared/generatePathToFile';

export default class ServiceRequestsReceivedGetCase {
    constructor(
        private servicesRequestsRepository: IServiceRequestsRepository,
        private addressRepository: IAddressesRepository,
        private condominiumRepository: ICondominiumsRepository
    ) {}

    async execute(data: IServiceRequestsReceivedGetDTO): Promise<DataPagination<ServiceRequestsWithUserData[]>> {
        const { userID, condominiumID, pageNumber, pageSize, serviceID } = data;

        const condDb = await this.condominiumRepository.findById(condominiumID);
        if(!condDb) throw new AppError('Condomínio não existe!', 404);

        const userAddress = await this.addressRepository.getByUserAndCond(userID, condominiumID);
        if (!userAddress) throw new AppError('Utilizador não pertence ao condomínio!', 403);

        const count = await this.servicesRequestsRepository.countReceived(userID, condominiumID, serviceID);
        if(!count) return { data: [], pages: 0, actualPage: pageNumber, nRecords: count }
        
        const pages = Math.ceil(count / pageSize);
        if (pageNumber > pages) throw new AppError('Página inválida!', 404);

        const serviceRequests = await this.servicesRequestsRepository.getReceivedWithPagination(userID, condominiumID, serviceID, pageSize, pageNumber);

        // Alterar as imagens para ter o url de acesso
        serviceRequests.map((req) => req.user.foto = req.user.foto ? generatePathToFile(req.user.foto) : req.user.foto = null );

        return { data: serviceRequests, pages, actualPage: pageNumber, nRecords: count }
    }
}