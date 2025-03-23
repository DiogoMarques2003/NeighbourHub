import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import AddressGetCase from './AddressGetCase';
import AddressGetVerifications from './AddressGetVerifications';
import IAddressGetDTO from './IAddressesGetDTO';

export default class AddressesGetController {
  constructor(
    private addressGetVerification: AddressGetVerifications,
    private addressGetCase: AddressGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAddressGetDTO = {
        userId: req.userID,
        condId: req.params.condId,
        pageSize: Number(req.query.pageSize),
        pageNumber: Number(req.query.pageNumber),
      };

      this.addressGetVerification.execute(requestData);
      const addresses = await this.addressGetCase.execute(requestData);

      res.status(200).json(addresses);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
