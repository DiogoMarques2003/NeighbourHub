import Votings from '@entities/Votings';

export default interface IVotingsRepository {
  findById(id: string): Promise<Votings | null>;
  create(voting: Votings): Promise<Votings>;
}
