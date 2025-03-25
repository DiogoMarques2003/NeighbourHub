import IOrdersRepository from '@repositories/IOrdersRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAddressesRepository from '@repositories/IAddressesRepository';
import IBudgetsRepository from '@repositories/IBudgetsRepository';
import IVotingCreateDTO from './IVotingCreateDTO';
import IMailProvider from '@providers/IMailProvider';
import AppError from '@errors/AppError';
import Budgets from '@entities/Budgets';
import { STATUS_ORDER_PENDING, STATUS_ORDER_VOTING } from '@constants/status';
import { resolve } from 'path';
import { EMAILS_PATH } from '@constants/filesPaths';
import dateFormat from '@shared/dateFormat';
import Orders from '@entities/Orders';

export default class VotingCreateCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private budgetsRepository: IBudgetsRepository,
    private mailProvider: IMailProvider
  ) {}
  async execute(data: IVotingCreateDTO): Promise<Orders> {
    const { orderID, userID, condominiumID, deadline, budgets } = data;

    const order = await this.ordersRepository.findById(orderID);
    if (!order) throw new AppError('Pedido não encontrado', 404);

    const condominium = await this.condominiumsRepository.findById(
      condominiumID
    );
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    if (order.condominiumId !== condominiumID)
      throw new AppError('Pedido não pertence a este condomínio', 401);

    if (condominium.adminId !== userID)
      throw new AppError('Utilizador não é administrador do condomínio', 401);

    if (order.status !== STATUS_ORDER_PENDING)
      throw new AppError('Pedido não está pendente', 401);

    if (budgets) {
      const budgetsClass: Budgets[] = [];
      for (const budget of budgets) {
        const budgetClass = new Budgets({
          orderId: orderID,
          amount: budget.amount,
          description: budget.description,
        });
        budgetsClass.push(budgetClass);
      }
      await this.budgetsRepository.createMany(budgetsClass);
    }
    order.status = STATUS_ORDER_VOTING;
    order.votingDeadline = deadline;
    await this.ordersRepository.update(order);
    const usersEmails = await this.addressesRepository.getAllUsersEmails(
      condominiumID
    );

    await this.mailProvider.sendMail(
      condominium.email,
      usersEmails,
      process.env.MAIL_FROM,
      'Nova votação',
      resolve(EMAILS_PATH, 'newVoting.hbs'),
      {
        condominioNome: condominium.name,
        dataFim: dateFormat(deadline),
        linkVotacao: `https://neighbourhub.diogomarques.dev/condominiums/${condominiumID}/order/${orderID}/voting`,
      }
    );
    return order;
  }
}
