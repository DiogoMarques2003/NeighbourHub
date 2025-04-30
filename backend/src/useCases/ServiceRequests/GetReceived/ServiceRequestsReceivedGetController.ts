import errorHandler from '@handlers/errorHandler';
import { Request, Response } from 'express';
import IServiceRequestsReceivedGetDTO from './IServiceRequestsReceivedGetDTO';
import ServiceRequestsReceivedGetCase from './ServiceRequestsReceivedGetCase';
import ServiceRequestsReceivedGetVerifications from './ServiceRequestsReceivedGetVerifications';

export default class ServiceRequestsReceivedGetController {
    constructor(
        private serviceRequestsReceivedGetVerifications: ServiceRequestsReceivedGetVerifications,
        private serviceRequestsReceivedGetCase: ServiceRequestsReceivedGetCase
    ) {}

    async handle(req: Request, res: Response) {
        try {
            const requestData: IServiceRequestsReceivedGetDTO = {
                userID: req.userID,
                condominiumID: req.params.condominiumID,
                serviceID: req.params.serviceID,
                pageNumber: Number(req.query.pageNumber),
                pageSize: Number(req.query.pageSize),
            };

            console.log('requestData: ', requestData)

            this.serviceRequestsReceivedGetVerifications.execute(requestData);
            
            console.log('requestData after verifications: ', requestData)

            const serviceRequests = await this.serviceRequestsReceivedGetCase.execute(requestData);

            res.status(200).json(serviceRequests);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}