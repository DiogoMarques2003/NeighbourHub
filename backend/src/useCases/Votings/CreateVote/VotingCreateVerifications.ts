import AppError from '@errors/AppError';
import IVotingCreateDTO from './IVotingCreateDTO';

export default class VotingCreateVerifications {
  execute(data: IVotingCreateDTO) {
    const { decision, budgetID, orderID } = data;

    if (typeof decision !== 'boolean')
      throw new AppError('Decisão inválida', 400);

    if (budgetID && typeof budgetID !== 'string')
      throw new AppError('Budget ID inválido', 400);

    if (!orderID || typeof orderID !== 'string')
      throw new AppError('Ordem inválida', 400);
  }
}
