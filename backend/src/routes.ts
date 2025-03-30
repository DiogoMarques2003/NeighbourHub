import verifyJWT from '@middlewares/verifyJWT';
import { condominiumCreateController } from '@useCases/Condominium/Create';
import { condominiumEditController } from '@useCases/Condominium/Edit';
import { condominiumGetController } from '@useCases/Condominium/Get';
import { condominiumDeleteController } from '@useCases/Condominium/Delete';
import { userCreateAccountController } from '@useCases/User/CreateAccount';
import { userGetInfoController } from '@useCases/User/GetInfo';
import { userLoginAccountController } from '@useCases/User/LoginAccount';
import { addressCreateController } from '@useCases/Addresses/Create';
import { commonAreasCreateController } from '@useCases/CommonAreas/Create';
import { addressGetByIdController } from '@useCases/Addresses/GetByID';
import { addressGetController } from '@useCases/Addresses/Get';
import { ordersCreateController } from '@useCases/Orders/Create';
import { commonAreasEditController } from '@useCases/CommonAreas/Edit';
import { Router } from 'express';
import multer from 'multer';
import os from 'os';
import { votingCreateController } from '@useCases/Orders/CreateVoting';
import { voteCreateController } from '@useCases/Orders/CreateVote';
import { commonAreasGetController } from '@useCases/CommonAreas/Get';
import { ordersGetController } from '@useCases/Orders/Get';
import { areaReservationsController } from '@useCases/AreaReservations/Create';
import { condominiumGetByUserController } from '@useCases/Condominium/GetByUser';

const router = Router();
const upload = multer({ dest: os.tmpdir() });

//---LOGIN
router.post('/register', upload.single('foto'), (req, res) => {
  userCreateAccountController.handle(req, res);
});

router.post('/login', (req, res) => {
  userLoginAccountController.handle(req, res);
});

router.get('/@me', verifyJWT, (req, res) => {
  userGetInfoController.handle(req, res);
});

//---CONDOMINIUM'S
router.post('/condominium', verifyJWT, (req, res) => {
  condominiumCreateController.handle(req, res);
});

router.get('/condominium', verifyJWT, (req, res) => {
  condominiumGetByUserController.handle(req, res);
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

router.get('/condominium/:id', verifyJWT, (req, res) => {
  condominiumGetController.handle(req, res);
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

//---COMMON AREAS
router.post('/condominium/:id/commonarea', upload.array('images'), verifyJWT, (req, res) => {
  commonAreasCreateController.handle(req, res);
});

router.get('/condominium/:condominiumId/orders', verifyJWT, (req, res) => {
  ordersGetController.handle(req, res);
});
router.put('/condominium/:condominiumId/commonarea/:idCommonArea', upload.array('imagesAdd'), verifyJWT, (req, res) => {
  commonAreasEditController.handle(req, res);
});

router.get('/condominium/:condId/commonarea', verifyJWT, (req, res) => {
  commonAreasGetController.handle(req, res);
});

//--AREA RESERVATION
router.post('/condominium/:condId/commonarea/:idCommonArea/reservation', verifyJWT, (req, res) => {
  areaReservationsController.handle(req, res);
});

//--VOTING

router.post('/condominium/:condominiumID/orders/:orderID/voting', verifyJWT, (req, res) => {
  votingCreateController.handle(req, res);
});

router.post('/condominium/:condominiumID/orders/:orderID/vote', verifyJWT, (req, res) => {
  voteCreateController.handle(req, res);
});

//--Orders
router.post('/condominium/:condominiumId/orders', verifyJWT, (req, res) => {
  ordersCreateController.handle(req, res);
});

export { router };
