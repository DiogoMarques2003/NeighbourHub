import Budgets from '@entities/Budgets';

export default interface IBudgetsRepository {
  findById(id: string): Promise<Budgets | null>;
  create(budget: Budgets): Promise<Budgets>;
}
