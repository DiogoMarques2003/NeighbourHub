import AppError from '@errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let message = `Internal server error: ${err.message}`;
  let statusCode = 500;
  if (err instanceof AppError) {
    message = err.message;
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({ message });
}
