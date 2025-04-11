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
      await this.addressDeleteCase.execute(requestData);

      res.status(200).json({ message: 'Endereço eliminado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
