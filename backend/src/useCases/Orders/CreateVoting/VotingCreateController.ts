import { Request, Response } from 'express';
import VotingCreateCase from './VotingCreateCase';
import VotingCreateVerifications from './VotingCreateVerifications';
import errorHandler from '@handlers/errorHandler';
import IVotingCreateDTO from './IVotingCreateDTO';

export default class VotingCreateController {
  constructor(
    private votingCreateVerifications: VotingCreateVerifications,
    private votingCreateCase: VotingCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IVotingCreateDTO = {
        userID: req.userID,
        orderID: req.params.orderID,
        condominiumID: req.params.condominiumID,
        deadline: req.body.deadline,
        budgets: req.body.budgets,
      };

      this.votingCreateVerifications.execute(requestData);

      const order = await this.votingCreateCase.execute(requestData);

      res.status(201).json({ order, message: 'Votação criada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
