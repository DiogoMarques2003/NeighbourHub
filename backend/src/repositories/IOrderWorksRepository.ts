import OrderWorks from '@entities/OrderWorks';

export default interface IOrderWorksRepository {
  findById(id: string): Promise<OrderWorks | null>;
  create(orderWork: OrderWorks): Promise<OrderWorks>;
  update(orderWork: OrderWorks): Promise<OrderWorks>;
  delete(id: string): Promise<boolean>;
  countWithFilters(orderId: string, status?: string, hasReport?: boolean): Promise<number>;
  findWithFilters(
    orderId: string,
    pageSize: number,
    pageNumber: number,
    status?: string,
    hasReport?: boolean,
  ): Promise<OrderWorks[]>;
  getFilesByCondominiumId(condominiumId: string): Promise<string[]>;
}
