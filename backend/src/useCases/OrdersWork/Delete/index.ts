import PrismaCondominiumsRepository from '@repositories/implementations/PrismaCondominiumsRepository';
import PrismaOrdersRepository from '@repositories/implementations/PrismaOrdersRepository';
import PrismaOrderWorksRepository from '@repositories/implementations/PrismaOrderWorksRepository';
import DeleteOrdersWorkVerifications from './DeleteOrdersWorkVerifications';
import DeleteOrdersWorkCase from './DeleteOrdersWorkCase';
import DeleteOrdersWorkController from './DeleteOrdersWorkController';

const condominiumRepository = new PrismaCondominiumsRepository();
const ordersRepository = new PrismaOrdersRepository();
const orderWorksRepository = new PrismaOrderWorksRepository();

const deleteOrdersWorkVerifications = new DeleteOrdersWorkVerifications();
const deleteOrdersWorkCase = new DeleteOrdersWorkCase(condominiumRepository, ordersRepository, orderWorksRepository);

const deleteOrdersWorkController = new DeleteOrdersWorkController(deleteOrdersWorkVerifications, deleteOrdersWorkCase);

export { deleteOrdersWorkController };
