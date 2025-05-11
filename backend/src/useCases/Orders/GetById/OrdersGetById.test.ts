import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH, URGENCY_LOW } from '@constants/urgency';
import { randomUUID } from 'crypto';

describe('Obtenção de Ordem por ID', () => {
  let orderId: string;

  beforeAll(async () => {
  });

  it('Admin deve obter uma ordem por ID com sucesso', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(global.pendingOrderId);
    expect(response.body.description).toBe("TESTE");
    expect(response.body.urgency).toBe(URGENCY_LOW);
  });

  it('Morador deve conseguir obter uma ordem por ID', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(global.pendingOrderId);
  });

  it('Deve dar erro por ordem inexistente', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${randomUUID()}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por condomínio inexistente', async () => {
    const response = await request(app)
      .get(`/api/condominium/${randomUUID()}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por morador não pertencer ao condomínio', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrderId}`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
