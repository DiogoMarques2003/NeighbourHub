import request from 'supertest';
import { app } from '@app';

describe('Criação de Order', () => {
  it('Deve criar uma work order com sucesso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('status', 'PENDING')
      .field('description', 'TESTE')
      .field('reportFile', '');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('orderWork');
    expect(response.body.orderWork).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não pode criar uma Work Order', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .field('status', 'PENDING')
      .field('description', 'TESTE')
      .field('reportFile', '');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Campos obrigatórios não preenchidos', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.orderId}/work`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .field('reportFile', '');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Erro ao criar work order, em pedidos que não estejam em curso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}/work`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('status', 'PENDING')
      .field('description', 'TESTE')
      .field('reportFile', '');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
