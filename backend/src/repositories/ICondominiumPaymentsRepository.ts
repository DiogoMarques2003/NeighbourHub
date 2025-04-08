import CondominiumPayments from '@entities/CondominiumPayments';

export default interface ICondominiumPaymentsRepository {
  findById(id: string): Promise<CondominiumPayments | null>;
  create(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments>;
  update(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments>;
  delete(id: string): Promise<Boolean>;
}
