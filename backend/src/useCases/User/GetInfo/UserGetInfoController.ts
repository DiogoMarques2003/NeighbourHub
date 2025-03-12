import { Request, Response } from 'express';
import UserGetInfoCase from './UserGetInfoCase';
import errorHandler from '@handlers/errorHandler';
import IUserGetInfoDTO from './IUserGetInfoDTO';

export default class UserGetInfoController {
  constructor(private userGetInfoCase: UserGetInfoCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IUserGetInfoDTO = {
        userId: req.userID,
      };

      const user = await this.userGetInfoCase.execute(requestData);

      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
