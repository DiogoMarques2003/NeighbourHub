import { Request, Response } from 'express';
import GetVotingDetailsCase from './GetVotingDetailsCase';
import GetVotingDetailsVerifications from './GetVotingDetailsVerifications';
import errorHandler from '@handlers/errorHandler';
import IGetVotingDetailsDTO from './IGetVotingDetailsDTO';

export default class GetVotingDetailsController {
  constructor(
    private getVotingDetailsVerification: GetVotingDetailsVerifications,
    private getVotingDetailsCase: GetVotingDetailsCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IGetVotingDetailsDTO = {
        condominiumId: req.params.condominiumId,
        userId: req.userID,
        orderId: req.params.orderId,
      };

      this.getVotingDetailsVerification.execute(requestData);
      const votingDetails = await this.getVotingDetailsCase.execute(requestData);
      res.status(200).json(votingDetails);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
