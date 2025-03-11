import OrderWorks from '@entities/OrderWorks';

export default interface IOrderWorksRepository {
  findById(id: string): Promise<OrderWorks | null>;
  create(orderWork: OrderWorks): Promise<OrderWorks>;
}
