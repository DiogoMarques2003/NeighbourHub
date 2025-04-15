import CondominiumPayments from '@entities/CondominiumPayments';
import { Prisma } from '@prismaClient/index';

export default interface ICondominiumPaymentsRepository {
  findById(id: string): Promise<CondominiumPayments | null>;
  create(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments>;
  update(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments>;
  delete(id: string): Promise<Boolean>;

  countWithFilters(filters?: Prisma.CondominiumPaymentsWhereInput): Promise<number>;
  getWithPagination(
    pageSize: number,
    pageNumber: number,
    filters?: Prisma.CondominiumPaymentsWhereInput,
    orderBy?: Prisma.CondominiumPaymentsOrderByWithRelationInput
  ): Promise<CondominiumPayments[]>;
}
