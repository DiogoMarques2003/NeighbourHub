import AppError from '@errors/AppError';
import IVotingCreateDTO from './IVotingCreateDTO';
import { isValidUUID } from '@shared/verifications';

export default class VotingCreateVerifications {
  execute(data: IVotingCreateDTO) {
    const { orderID, budgets, deadline, condominiumID } = data;

    if (!orderID || typeof orderID !== 'string' || !isValidUUID(orderID))
      throw new AppError('ID do pedido inválido', 400);

    if (
      !condominiumID ||
      typeof condominiumID !== 'string' ||
      !isValidUUID(condominiumID)
    )
      throw new AppError('ID do condomínio inválido', 400);
    if (budgets && !Array.isArray(budgets))
      throw new AppError('Orçamentos inválidos', 400);
    if (budgets) {
      for (const budget of budgets) {
        if (!budget.description || typeof budget.description !== 'string')
          throw new AppError('Descrição do orçamento inválida', 400);
        if (!budget.amount || typeof budget.amount !== 'number')
          throw new AppError('Valor do orçamento inválido', 400);
      }
    }
    if (
      !deadline ||
      typeof deadline !== 'string' ||
      new Date() > new Date(deadline)
    )
      throw new AppError('Data limite inválida', 400);

    data.deadline = new Date(deadline);
  }
}
