import { userCreateAccountController } from '@useCases/User/CreateAccount';
import { Router } from 'express';
import multer from 'multer';
import os from 'os';

const router = Router();
const upload = multer({ dest: os.tmpdir() });

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/register', upload.single('foto'), (req, res) => {
  userCreateAccountController.handle(req, res);
});

export { router };
