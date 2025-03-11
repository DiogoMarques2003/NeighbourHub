import express from 'express';
import { router } from './routes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import errorHandler from '@handlers/errorHandler';
import { join } from 'path';

const app = express();

app.use(express.json());
app.use('/api', router);
// Permitir acesso a partir do browser
app.use(cors());
// Configuração do sistema para receber arquivos, aceder no req.files
app.use(fileUpload());
// Tratamento de exeções
app.use(errorHandler);

// Se tiver em produtivo fornecer o site também
if (process.env.NODE_ENV === 'production') {
  const frontendPath = join(__dirname, '..', '..', 'frontend', 'build');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });
}

export { app };
