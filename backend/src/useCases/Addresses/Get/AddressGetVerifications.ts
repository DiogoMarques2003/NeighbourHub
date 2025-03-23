import { isValidUUID } from '@shared/verifications';
import IAddressGetDTO from './IAddressesGetDTO';
import AppError from '@errors/AppError';

export default class AddressGetVerifications {
  execute(data: IAddressGetDTO) {
    const { condId, pageSize, pageNumber } = data;

    if (!condId || typeof condId !== 'string' || !isValidUUID(condId))
      throw new AppError('Id inválido', 400);

    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
  }
}
