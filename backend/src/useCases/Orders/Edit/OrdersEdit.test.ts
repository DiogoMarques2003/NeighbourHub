import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH, URGENCY_LOW, URGENCY_MEDIUM } from '@constants/urgency';
import { STATUS_ORDER_PENDING, STATUS_ORDER_IN_PROGRESS, STATUS_ORDER_COMPLETED, STATUS_ORDER_CANCELLED, STATUS_ORDER_VOTING, } from '@constants/status';
import { randomUUID } from 'crypto';

describe('Edição de Ordem', () => {

  it('Administrador deve editar o status da ordem', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: STATUS_ORDER_IN_PROGRESS
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order.urgency).toBe(URGENCY_LOW);
    expect(response.body.order.status).toBe(STATUS_ORDER_IN_PROGRESS);
    expect(response.body).toHaveProperty('message');
  });

  it('Dono da ordem deve poder editar a descrição e a urgência', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        description: 'Ordem editada pelo dono da ordem e não admin',
        urgency: URGENCY_HIGH
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order.description).toBe('Ordem editada pelo dono da ordem e não admin');
    expect(response.body.order.urgency).toBe(URGENCY_HIGH);
    expect(response.body.order.status).toBe(STATUS_ORDER_IN_PROGRESS);
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir editar o status de uma ordem', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        description: 'Tentativa de edição por morador',
        status: STATUS_ORDER_COMPLETED
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Morador que não seja o dono do pedido não deve conseguir editar a ordem', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        description: 'Tentativa de edição por morador'
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por ordem inexistente', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${randomUUID()}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        description: 'Tentativa de edição de ordem inexistente',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por status inválido', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: 'INVALID_STATUS',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por urgência inválida', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        urgency: 'INVALID_URGENCY',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
