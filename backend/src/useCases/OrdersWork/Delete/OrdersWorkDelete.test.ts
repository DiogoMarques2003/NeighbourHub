import request from 'supertest';
import { app } from '@app';
import OrderWorks from '@entities/OrderWorks';
import { STATUS_ORDER_IN_PROGRESS } from '@constants/status';
import { v4 as uuid } from 'uuid';

describe('Apagar Work Area', () => {
  let workOrderId: string;

  beforeAll(async () => {
    const workOrder = new OrderWorks({
      description: 'TESTE',
      status: STATUS_ORDER_IN_PROGRESS,
      reportFile: '',
      orderId: global.orderId,
    });
    await global.prisma.orderWorks.create({ data: workOrder });
    workOrderId = workOrder.id;
  });

  it('Morador não pode apagar uma Work Order', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${workOrderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Admin pode apagar uma Work Order', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${workOrderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Retornar Erro se não existir Work Area', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${uuid()}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
