import CondominiumPayments from '@entities/CondominiumPayments';

export default interface ICondominiumPaymentsRepository {
  findById(id: string): Promise<CondominiumPayments | null>;
  create(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments>;
}
