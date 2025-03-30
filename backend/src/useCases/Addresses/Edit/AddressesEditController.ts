import { Request, Response } from 'express';
import AddressesEditCase from './AddressesEditCase';
import AddressesEditVerifications from './IAddressesEditVerifications';
import IAddressesEditDTO from './IAddressesEditDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class AddressesEditController {
  constructor(
    private addressEditVerifications: AddressesEditVerifications,
    private addressEditCase: AddressesEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAddressesEditDTO = {
        id: req.params.addressId,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        postalCode: req.body.postalCode,
        houseType: req.body.houseType,
        condominiumId: req.params.condominiumId,
        adminId: req.userID,
      };

      this.addressEditVerifications.execute(requestData);
      const updatedAddress = await this.addressEditCase.execute(requestData);

      if (!updatedAddress) throw new AppError('Erro ao atualizar morador', 500);

      res.status(200).json({ updatedAddress, message: 'Morador atualizado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
