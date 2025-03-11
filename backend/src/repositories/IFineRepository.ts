import Fine from '@entities/Fine';

export default interface IFineRepository {
  findById(id: string): Promise<Fine | null>;
  create(fine: Fine): Promise<Fine>;
}
