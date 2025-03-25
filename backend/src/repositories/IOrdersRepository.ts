import Orders from '@entities/Orders';

export default interface IOrdersRepository {
  findById(id: string): Promise<Orders | null>;
  create(order: Orders): Promise<Orders>;
  update(order: Orders): Promise<Orders>;
}
