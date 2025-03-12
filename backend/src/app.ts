import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { join } from 'path';
import errorHandler from '@handlers/errorHandler';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(upload.none());
app.use('/api', router);
// Permitir acesso a partir do browser
app.use(cors());
// Tratar erros
app.use((err, _req, res, _next) => errorHandler(err, res));

// Se tiver em produtivo fornecer o site também
if (process.env.NODE_ENV === 'production') {
  const frontendPath = join(__dirname, '..', '..', 'frontend', 'build');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });
}

export { app };
