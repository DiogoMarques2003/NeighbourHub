import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import AddressGetByIdCase from './AddressGetByIdCase';
import AddressGetByIdVerifications from './AdressGetByIdVerifications';
import IAddressGetByIdDTO from './IAdressGetByIdDTO';

export default class AddresGetByIdController {
  constructor(
    private addressGetByIdVerifications: AddressGetByIdVerifications,
    private addressGetByIdCase: AddressGetByIdCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAddressGetByIdDTO = {
        userId: req.userID,
        condId: req.params.condId,
        id: req.params.id,
      };

      this.addressGetByIdVerifications.execute(requestData);
      const address = await this.addressGetByIdCase.execute(requestData);

      res.status(200).json(address);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
