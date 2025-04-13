import { Request, Response } from 'express';
import AddressesDeleteCase from './AddressesDeleteCase';
import AddressesDeleteVerifications from './AddressesDeleteVerifications';
import IAddressesDeleteDTO from './IAddressesDeleteDTO';
import errorHandler from '@handlers/errorHandler';

export default class AddressesDeleteController {
  constructor(
    private addressDeleteVerifications: AddressesDeleteVerifications,
    private addressDeleteCase: AddressesDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAddressesDeleteDTO = {
        id: req.params.addressId,
        condominiumId: req.params.condominiumId,
        adminId: req.userID,
      };

      this.addressDeleteVerifications.execute(requestData);
      const isDeleted = await this.addressDeleteCase.execute(requestData);

      res
        .status(isDeleted ? 200 : 500)
        .json({ message: isDeleted ? 'Endereço eliminado com sucesso' : 'Erro ao eliminar endereço' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
