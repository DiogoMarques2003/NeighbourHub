import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Carregar o env de testes
dotenv.config({ path: '.env.test' });

process.env.NODE_ENV = 'test';

// Alterar o timeout para 20 segundos
jest.setTimeout(20000);