import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import StartVotingProcessCase from './StartVotingProcessCase';
import StartVotingProcessVerifications from './StartVotingProcessVerifications';
import IStartVotingProcessDTO from './IStartVotingProcessDTO';

export default class StartVotingProcessController {
  constructor(
    private votingCreateVerifications: StartVotingProcessVerifications,
    private votingCreateCase: StartVotingProcessCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IStartVotingProcessDTO = {
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
