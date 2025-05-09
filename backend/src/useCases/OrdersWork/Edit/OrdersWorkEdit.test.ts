import request from 'supertest';
import { app } from '@app';
import { STATUS_ORDER_COMPLETED } from '@constants/status';

describe('Edição de uma Work Order', () => {
  it('Edição de uma work order com sucesso', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${global.orderWorkId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: STATUS_ORDER_COMPLETED,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('orderWork');
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não pode editar Work Order', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${global.orderWorkId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        status: STATUS_ORDER_COMPLETED,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Status inválido', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work/${global.orderWorkId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: 'SIM',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
