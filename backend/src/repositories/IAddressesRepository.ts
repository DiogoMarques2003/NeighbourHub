import Addresses from '@entities/Addresses';

export default interface IAddressesRepository {
  findById(id: string): Promise<Addresses | null>;
  create(address: Addresses): Promise<Addresses>;
  countByCondID(condId: string): Promise<number>;
  getCondAddressWithPagination(
    condId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Addresses[]>;
  getByUserAndCond(userId: string, condId: string): Promise<Addresses | null>;
}
