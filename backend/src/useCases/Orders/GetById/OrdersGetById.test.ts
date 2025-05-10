import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH } from '@constants/urgency';
import { randomUUID } from 'crypto';

describe('Obtenção de Ordem por ID', () => {
  let orderId: string;

  beforeAll(async () => {
    // criar uma ordem de modo a usar nos testes
    const orderResponse = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        description: 'Ordem para obtenção por ID',
        urgency: URGENCY_HIGH,
      });

    orderId = orderResponse.body.id;
  });

  it('Admin deve obter uma ordem por ID com sucesso', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${orderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(orderId);
    expect(response.body.order.description).toBe('Ordem para obtenção por ID');
    expect(response.body.order.urgency).toBe(URGENCY_HIGH);
  });

  it('Morador deve conseguir obter uma ordem por ID', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${orderId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(orderId);
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
      .get(`/api/condominium/${randomUUID()}/orders/${orderId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por morador não pertencer ao condomínio', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders/${orderId}`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
