import verifyJWT from '@middlewares/verifyJWT';
import { condominiumCreateController } from '@useCases/Condominium/Create';
import { condominiumGetController } from '@useCases/Condominium/Get';
import { userCreateAccountController } from '@useCases/User/CreateAccount';
import { userGetInfoController } from '@useCases/User/GetInfo';
import { userLoginAccountController } from '@useCases/User/LoginAccount';
import { Router } from 'express';
import multer from 'multer';
import os from 'os';

const router = Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/register', upload.single('foto'), (req, res) => {
  userCreateAccountController.handle(req, res);
});

router.post('/login', (req, res) => {
  userLoginAccountController.handle(req, res);
});

router.get('/@me', verifyJWT, (req, res) => {
  userGetInfoController.handle(req, res);
});

router.post('/condominium', verifyJWT, (req, res) => {
  condominiumCreateController.handle(req, res);
});

router.get('/condominium/:id', verifyJWT, (req, res) =>{
  condominiumGetController.handle(req, res)
})

export { router };
