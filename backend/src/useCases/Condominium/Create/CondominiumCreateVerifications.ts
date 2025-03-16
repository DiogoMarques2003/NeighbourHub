import AppError from '@errors/AppError';
import ICondominiumCreateDTO from './ICondominiumCreateDTO';
import { EMAIL_REGEX } from '@constants/regexs';

export default class CondominiumCreateVerifications {
  execute(data: ICondominiumCreateDTO) {
    const { name, email, phoneNumber, monthlyQuota } = data;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email))
      throw new AppError('Email inválido', 400);

    if (!name || typeof name !== 'string')
      throw new AppError('Nome inválido', 400);

    if (!phoneNumber || typeof phoneNumber !== 'string')
      throw new AppError('Número de telefone inválido', 400);

    if (typeof monthlyQuota !== 'number' || monthlyQuota <= 0)
      throw new AppError('Pagamento mensal inválido', 400);
  }
}
