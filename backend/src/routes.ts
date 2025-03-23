import verifyJWT from '@middlewares/verifyJWT';
import { condominiumCreateController } from '@useCases/Condominium/Create';
import { condominiumEditController } from '@useCases/Condominium/Edit';
import { condominiumGetController } from '@useCases/Condominium/Get';
import { condominiumDeleteController } from '@useCases/Condominium/Delete';
import { userCreateAccountController } from '@useCases/User/CreateAccount';
import { userGetInfoController } from '@useCases/User/GetInfo';
import { userLoginAccountController } from '@useCases/User/LoginAccount';
import { Router } from 'express';
import multer from 'multer';
import os from 'os';
import { addressCreateController } from '@useCases/Addresses/Create';
import { addressGetByIdController } from '@useCases/Addresses/GetByID';
import { addressGetController } from '@useCases/Addresses/Get';

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

router.get('/condominium/:id', verifyJWT, (req, res) => {
  condominiumGetController.handle(req, res);
});

router.get('/condominium/:id', verifyJWT, (req, res) => {
  condominiumGetController.handle(req, res);
});

router.put('/condominium/:idCondominium', verifyJWT, (req, res) => {
  condominiumEditController.handle(req, res);
});

router.delete('/condominium/:condominiumID', verifyJWT, (req, res) => {
  condominiumDeleteController.handle(req, res);
});

router.post('/condominium/:condominiumId/address', verifyJWT, (req, res) => {
  addressCreateController.handle(req, res);
});

router.get('/condominium/:condId/address', verifyJWT, (req, res) => {
  addressGetController.handle(req, res);
});

router.get('/condominium/:condId/address/:id', verifyJWT, (req, res) => {
  addressGetByIdController.handle(req, res);
});

export { router };
