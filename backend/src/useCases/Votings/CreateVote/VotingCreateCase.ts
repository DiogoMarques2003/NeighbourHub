import IVotingsRepository from '@repositories/IVotingsRepository';
import IVotingCreateDTO from './IVotingCreateDTO';
import Votings from '@entities/Votings';
import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IBudgetsRepository from '@repositories/IBudgetsRepository';
import { STATUS_ORDER_VOTING } from '@constants/status';

export default class VotingCreateCase {
  constructor(
    private votingsRepository: IVotingsRepository,
    private adressesRepository: IAddressesRepository,
    private ordersRepository: IOrdersRepository,
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(data: IVotingCreateDTO): Promise<Votings> {
    const { decision, budgetID, orderID, userID, condominiumID } = data;

    const orderDb = await this.ordersRepository.findById(orderID);
    if (!orderDb) throw new AppError('A ordem requisitada não existe!', 404);
    if (orderDb.condominiumId != condominiumID) throw new AppError('A ordem não coincide com o condomínio!', 400);

    // Valida se o user tem autorização para votar
    const adressesDb = await this.adressesRepository.getByUserAndCond(userID, condominiumID);
    if (!adressesDb) throw new AppError('Não tem autorização para votar porque não faz parte do condomínio!', 403);

    const budgetsCount = await this.budgetsRepository.countByOrderID(orderID);
    if (budgetsCount && decision && !budgetID) throw new AppError('Apenas é possível votar num orçamento!', 400);

    //Valida budget
    if (budgetID) {
      const budgetDb = await this.budgetsRepository.findById(budgetID);
      if (!budgetDb) throw new AppError('O budgetID não existe!', 404);
      if (budgetDb.orderId != orderID) throw new AppError('O budgetID não é válido!', 400);
    }

    // Valida se a votação já terminou
    if (orderDb.status != STATUS_ORDER_VOTING || orderDb.votingDeadline < new Date())
      throw new AppError('Não é possível votar!', 400);

    const votingClass = new Votings({
      orderID,
      userID,
      decision,
      budgetID,
    });

    await this.votingsRepository.upsert(votingClass);
    return votingClass;
  }
}
