import { Request, Response } from 'express';
import VotingCreateCase from './VotingCreateCase';
import VotingCreateVerifications from './VotingCreateVerifications';
import IVotingCreateDTO from './IVotingCreateDTO';
import errorHandler from '@handlers/errorHandler';

export default class VotingCreateController {
  constructor(
    private votingCreateVerifications: VotingCreateVerifications,
    private votingCreateCase: VotingCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IVotingCreateDTO = {
        orderID: req.params.orderID,
        condominiumID: req.params.condominiumID, 
        userID: req.userID,
        decision: req.body.decision,
        budgetID: req.body.budgetID
      };

      this.votingCreateVerifications.execute(requestData);
      const voting = await this.votingCreateCase.execute(requestData);

      res
        .status(201)
        .json({ voting, message: 'Votação criada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
