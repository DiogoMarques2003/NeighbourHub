import { BEARRER_REGEX } from '@constants/regexs';
import AppError from '@errors/AppError';
import { isValidUUID } from '@shared/verifications';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) throw new AppError('Token não fornecido', 401, true);

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2) throw new AppError('Token inválido', 401, true);

  const [schema, tokenValue] = tokenParts;
  if (!BEARRER_REGEX.test(schema)) throw new AppError('Token inválido', 401, true);

  try {
    const jwtData = jwt.verify(tokenValue, process.env.JWT_SECRET);
    if (!jwtData || typeof jwtData !== 'object') throw new AppError('Token inválido', 401, true);

    req.userID = jwtData.params.id;
    if (!isValidUUID(req.userID)) throw new AppError('Token inválido', 401, true);
  } catch {
    throw new AppError('Token expirado', 401, true);
  }

  next();
}
