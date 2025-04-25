import AppError from '@errors/AppError';
import ICondominiumUpdateDTO from './ICondominiumEditDTO';
import { EMAIL_REGEX } from '@constants/regexs';
import { isValidUUID } from '@shared/verifications';

export default class CondominiumEditVerifications {
  execute(data: ICondominiumUpdateDTO) {
    const { idCondominium, name, email, phoneNumber, monthlyQuota } = data;

    if (
      !idCondominium ||
      typeof idCondominium !== 'string' ||
      !isValidUUID(idCondominium)
    )
      throw new AppError('Id do condominio inválido', 400);

    if (email && (typeof email !== 'string' || !EMAIL_REGEX.test(email)))
      throw new AppError('Email inválido', 400);

    if (name && typeof name !== 'string')
      throw new AppError('Nome inválido', 400);

    if (phoneNumber && typeof phoneNumber !== 'string')
      throw new AppError('Número de telefone inválido', 400);

    if (
      monthlyQuota !== undefined &&
      (typeof monthlyQuota !== 'number' || monthlyQuota <= 0)
    )
      throw new AppError('Pagamento mensal inválido', 400);
  }
}
