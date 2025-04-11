import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { join } from 'path';
import errorHandler from '@handlers/errorHandler';
import { existsSync } from 'fs';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Permitir acesso a partir do browser
app.use(cors());

app.use('/api', router);
// Tratar erros
app.use((err, _req, res, _next) => errorHandler(err, res));

// Para os arquivos salvos na api
app.use('/content/*', (req, res) => {
  const filePath = join(__dirname, '..', req.originalUrl.replace('/content', ''));
  if (!existsSync(filePath)) res.status(404).send();
  else res.sendFile(filePath);
});

// Se tiver em produtivo fornecer o site também
if (process.env.NODE_ENV === 'production') {
  const frontendPath = join(__dirname, '..', '..', 'frontend', 'dist');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });
}

export { app };
