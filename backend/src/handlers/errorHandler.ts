import AppError from '@errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: Error, res: Response) {
  let message = `Internal server error: ${err.message}`;
  let statusCode = 500;
  let isFromAuth = false;
  if (err instanceof AppError) {
    message = err.message;
    statusCode = err.statusCode;
    isFromAuth = err.isFromAuth;
  }
  
  res.status(statusCode).json({ message, isFromAuth });
}
