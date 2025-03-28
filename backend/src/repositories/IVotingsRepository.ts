import Votings from '@entities/Votings';

export default interface IVotingsRepository {
  findByOrderAndUser(orderID: string, userID: string): Promise<Votings | null>;
  upsert(voting: Votings): Promise<Votings>;
}
