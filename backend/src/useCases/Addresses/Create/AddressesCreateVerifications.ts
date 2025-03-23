import IAddressesCreateDTO from './IAddressesCreateDTO';
import AppError from '@errors/AppError';
import { EMAIL_REGEX } from '@constants/regexs';
import { isValidUUID } from '@shared/verifications';

export default class AddressesCreateVerifications {
  execute(data: IAddressesCreateDTO) {
    const {
      country,
      city,
      street,
      houseNumber,
      postalCode,
      houseType,
      userEmail,
      condominiumId,
    } = data;

    if (!country || typeof country !== 'string')
      throw new AppError('País inválido', 400);

    if (!city || typeof city !== 'string')
      throw new AppError('Cidade inválida', 400);

    if (!street || typeof street !== 'string')
      throw new AppError('Rua inválida', 400);

    if (!houseNumber || typeof houseNumber !== 'string')
      throw new AppError('Nº de casa inválido', 400);

    if (!postalCode || typeof postalCode !== 'string')
      throw new AppError('Código Postal inválido', 400);

    if (!houseType || typeof houseType !== 'number')
      throw new AppError('Tipo de casa inválido', 400);

    if (
      !userEmail ||
      typeof userEmail !== 'string' ||
      !EMAIL_REGEX.test(userEmail)
    )
      throw new AppError('Email inválido', 400);

    if (
      !condominiumId ||
      typeof condominiumId !== 'string' ||
      !isValidUUID(condominiumId)
    )
      throw new AppError('Id condomínio inválido', 400);
  }
}
