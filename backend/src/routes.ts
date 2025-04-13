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
import { addressEditController } from '@useCases/Addresses/Edit';
import { condominiumGetByUserController } from '@useCases/Condominium/GetByUser';
import { userEditController } from '@useCases/User/Edit';
import { servicesCreateController } from '@useCases/Services/Create';
import { ordersGetByIdController } from '@useCases/Orders/GetById';
import { servicesGetAllController } from '@useCases/Services/GetAll';
import { servicesGetByIdController } from '@useCases/Services/GetByID';
import { condominiumPaymentsCreateController } from '@useCases/CondominiumPayments/Create';
import { condominiumPaymentsEditController } from '@useCases/CondominiumPayments/Edit';
import { condominiumPaymentsDeleteController } from '@useCases/CondominiumPayments/Delete';
import { condominiumPaymentsGetByIdController } from '@useCases/CondominiumPayments/GetById';
import { condominiumPaymentsGetController } from '@useCases/CondominiumPayments/Get';
import { servicesRequestController } from '@useCases/Services/Request';
import { servicesReviewController } from '@useCases/Services/Review';
import { serviceEditController } from '@useCases/Services/Edit';
import { addressDeleteController } from '@useCases/Addresses/Delete';
import { servicesDeleteController } from '@useCases/Services/Delete';

const router = Router();
const upload = multer({ dest: os.tmpdir() });

//---USER
router.post('/register', upload.single('foto'), (req, res) => {
  userCreateAccountController.handle(req, res);
});

router.post('/login', (req, res) => {
  userLoginAccountController.handle(req, res);
});

router.put('/user', verifyJWT, upload.single('foto'), (req, res) => {
  userEditController.handle(req, res);
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

router.put('/condominium/:idCondominium', verifyJWT, (req, res) => {
  condominiumEditController.handle(req, res);
});

router.get('/condominium/:id', verifyJWT, (req, res) => {
  condominiumGetController.handle(req, res);
});

router.delete('/condominium/:condominiumID', verifyJWT, (req, res) => {
  condominiumDeleteController.handle(req, res);
});

//---ADDRESSS

router.post('/condominium/:condominiumId/address', verifyJWT, (req, res) => {
  addressCreateController.handle(req, res);
});

router.get('/condominium/:condId/address', verifyJWT, (req, res) => {
  addressGetController.handle(req, res);
});

router.get('/condominium/:condId/address/:id', verifyJWT, (req, res) => {
  addressGetByIdController.handle(req, res);
});

router.put('/condominium/:condominiumId/address/:addressId', verifyJWT, (req, res) => {
  addressEditController.handle(req, res);
});

router.delete('/condominium/:condominiumId/address/:addressId', verifyJWT, (req, res) => {
  addressDeleteController.handle(req, res);
});

//---COMMON AREAS
router.post('/condominium/:id/commonarea', upload.array('images'), verifyJWT, (req, res) => {
  commonAreasCreateController.handle(req, res);
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

//--SERVICES

router.post('/condominium/:condId/services', verifyJWT, (req, res) => {
  servicesCreateController.handle(req, res);
});

router.get('/condominium/:condId/services', verifyJWT, (req, res) => {
  servicesGetAllController.handle(req, res);
});

router.get('/condominium/:condId/services/:serviceId', verifyJWT, (req, res) => {
  servicesGetByIdController.handle(req, res);
});

router.delete('/condominium/:condominiumId/services/:serviceId', verifyJWT, (req, res) => {
  servicesDeleteController.handle(req, res);
});

router.post('/condominium/:condId/services/:serviceId/request', verifyJWT, (req, res) => {
  servicesRequestController.handle(req, res);
});

router.post('/condominium/:condId/services/:serviceId/request/:requestId/review', verifyJWT, (req, res) => {
  servicesReviewController.handle(req, res);
});

router.post('/condominium/:condId/services/:serviceId', verifyJWT, (req, res) => {
  serviceEditController.handle(req, res);
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

router.get('/condominium/:condominiumId/orders', verifyJWT, (req, res) => {
  ordersGetController.handle(req, res);
});

router.get('/condominium/:condominiumId/orders/:orderId', verifyJWT, (req, res) => {
  ordersGetByIdController.handle(req, res);
});

//--Payments
router.post('/condominium/:condominiumId/payments', verifyJWT, (req, res) => {
  condominiumPaymentsCreateController.handle(req, res);
});

router.put('/condominium/:condominiumId/payments/:condominiumPaymentId', verifyJWT, (req, res) => {
  condominiumPaymentsEditController.handle(req, res);
});

router.delete('/condominium/:condominiumId/payments/:condominiumPaymentId', verifyJWT, (req, res) => {
  condominiumPaymentsDeleteController.handle(req, res);
});

router.get('/condominium/:condominiumId/payments/:condominiumPaymentId', verifyJWT, (req, res) => {
  condominiumPaymentsGetByIdController.handle(req, res);
});

router.get('/condominium/:condominiumId/payments', verifyJWT, (req, res) => {
  condominiumPaymentsGetController.handle(req, res);
});

export { router };
