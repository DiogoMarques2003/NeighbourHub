import errorHandler from '@handlers/errorHandler';
import { Request, Response } from 'express';
import IServiceRequestsGetDTO from './IServiceRequestsGetDTO';
import ServiceRequestsGetCase from './ServiceRequestsGetCase';
import ServiceRequestsGetVerifications from './ServiceRequestsGetVerifications';

export default class ServiceRequestsGetController {
    constructor(
        private serviceRequestsGetVerifications: ServiceRequestsGetVerifications,
        private serviceRequestsGetCase: ServiceRequestsGetCase
    ) {}

    async handle(req: Request, res: Response) {
        try {
            const requestData: IServiceRequestsGetDTO = {
                userID: req.userID,
                condominiumID: req.params.condominiumID,
                pageNumber: Number(req.query.pageNumber),
                pageSize: Number(req.query.pageSize),
            };

            this.serviceRequestsGetVerifications.execute(requestData);
            const serviceRequests = await this.serviceRequestsGetCase.execute(requestData);

            res.status(200).json(serviceRequests);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}