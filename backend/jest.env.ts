import dotenv from 'dotenv';

// Carregar o env de testes
dotenv.config({ path: '.env.test' });

// Alterar o timeout para 20 segundos
jest.setTimeout(20000);