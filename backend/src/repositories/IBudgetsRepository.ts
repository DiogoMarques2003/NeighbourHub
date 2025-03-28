import Budgets from '@entities/Budgets';
import { Prisma } from '@prisma/client';

export default interface IBudgetsRepository {
  findById(id: string): Promise<Budgets | null>;
  countByOrderID(id: string): Promise<number>;
  createMany(budgets: Budgets[]): Promise<Prisma.BatchPayload>;
}
