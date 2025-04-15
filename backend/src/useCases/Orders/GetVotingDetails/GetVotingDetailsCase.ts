import IAddressesRepository from '@repositories/IAddressesRepository';
import IBudgetsRepository from '@repositories/IBudgetsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IVotingsRepository from '@repositories/IVotingsRepository';
import IGetVotingDetailsDTO from './IGetVotingDetailsDTO';
import AppError from '@errors/AppError';

export default class GetVotingDetailsCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private votinsgsRepository: IVotingsRepository,
    private budgetsRepositoryy: IBudgetsRepository
  ) {}

  async execute(data: IGetVotingDetailsDTO): Promise<GetVotingDetailsResponse> {
    const { condominiumId, orderId, userId } = data;

    let userVote: GetVotingDetailsResponse['userVote'] = null;

    const condDb = await this.condominiumRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Condomínio não existe!', 404);

    const userAddress = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!userAddress && condDb.adminId !== userId) throw new AppError('Utilizador não pertence ao condomínio!', 403);

    const order = await this.ordersRepository.findByIdWithUserData(orderId);
    if (!order) throw new AppError('Pedido não existe!', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Pedido não pertence ao condomínio!', 403);
    if (!order.votingDeadline) throw new AppError('Pedido não está em votação!', 400);

    const countVotes = await this.votinsgsRepository.countByOrder(orderId);
    const budgets = await this.budgetsRepositoryy.getBudgetsByOrderIdWithVotes(orderId);

    if (condDb.adminId !== userId) {
      const userVoteDb = await this.votinsgsRepository.findByOrderAndUser(orderId, userId);
      if (userVoteDb) {
        userVote = {
          decision: userVoteDb.decision,
          budgetId: userVoteDb.budgetID,
        };
      }
    }

    return {
      description: order.description,
      votingDeadline: order.votingDeadline,
      budgets,
      userVote,
      ...countVotes,
    };
  }
}
