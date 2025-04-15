import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaOrderWorksRepository from '@repositories/implementations/PrismaOrderWorksRepository';
import EditOrdersWorkVerifications from './EditOrdersWorkVerifications';
import EditOrdersWorkCase from './EditOrdersWorkCase';
import EditOrdersWorkController from './EditOrdersWorkController';

const condominiumRepository = new PrismaCondominiumsRepository();
const ordersRepository = new PrismaOrdersRepository();
const orderWorksRepository = new PrismaOrderWorksRepository();

const editOrdersWorkVerifications = new EditOrdersWorkVerifications();
const editOrdersWorkCase = new EditOrdersWorkCase(condominiumRepository, ordersRepository, orderWorksRepository);

const editOrdersWorkController = new EditOrdersWorkController(editOrdersWorkVerifications, editOrdersWorkCase);

export { editOrdersWorkController };
