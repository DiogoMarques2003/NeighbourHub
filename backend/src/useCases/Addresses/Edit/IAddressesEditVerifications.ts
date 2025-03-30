import IAddressesEditDTO from './IAddressesEditDTO';
import AppError from '@errors/AppError';
import { isValidUUID } from '@shared/verifications';

export default class AddressesEditVerifications {
  execute(data: IAddressesEditDTO) {
    const { id, country, city, street, houseNumber, postalCode, houseType, condominiumId } = data;

    if (!id || typeof id !== 'string' || !isValidUUID(id)) throw new AppError('ID do endereço inválido', 400);

    if (country !== undefined && typeof country !== 'string') throw new AppError('País inválido', 400);

    if (city !== undefined && typeof city !== 'string') throw new AppError('Cidade inválida', 400);

    if (street !== undefined && typeof street !== 'string') throw new AppError('Rua inválida', 400);

    if (houseNumber !== undefined && typeof houseNumber !== 'string') throw new AppError('Nº de casa inválido', 400);

    if (postalCode !== undefined && typeof postalCode !== 'string') throw new AppError('Código Postal inválido', 400);

    if (houseType !== undefined && typeof houseType !== 'number') throw new AppError('Tipo de casa inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);
  }
}
