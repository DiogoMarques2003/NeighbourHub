import { Request, Response } from 'express';
import AddressesCreateCase from './AddressesCreateCase';
import AddressesCreateVerifications from './AddressesCreateVerifications';
import IAddressesCreateDTO from './IAddressesCreateDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class AddressesCreateController {
  constructor(
    private addressCreateVerifications: AddressesCreateVerifications,
    private addressCreateCase: AddressesCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAddressesCreateDTO = {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        postalCode: req.body.postalCode,
        houseType: req.body.houseType,
        userEmail: req.body.userEmail,
        condominiumId: req.params.condominiumId,
        adminId: req.userID,
      };

      this.addressCreateVerifications.execute(requestData);
      const address = await this.addressCreateCase.execute(requestData);

      if (!address) throw new AppError('Erro ao registar novo morador', 500);

      res
        .status(201)
        .json({ address, message: 'Morador registado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
