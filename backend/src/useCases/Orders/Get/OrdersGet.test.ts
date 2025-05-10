import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH } from '@constants/urgency';
import { STATUS_ORDER_PENDING } from '@constants/status';

describe('Listagem de Ordens', () => {
  beforeAll(async () => {
    // criar várias ordens de modo a testar a paginação
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post(`/api/condominium/${global.condominiumId}/orders`)
        .set('Authorization', `Bearer ${global.residentToken}`)
        .send({
          description: `Ordem de teste ${i + 1}`,
          urgency: i % 2 === 0 ? 'HIGH' : 'MEDIUM',
        });
    }
  });

  it('Deve listar ordens com sucesso para o admin', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .query({
        pageSize: 10,
        pageNumber: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body).toHaveProperty('nRecords');
    expect(response.body).toHaveProperty('pages');
    expect(response.body).toHaveProperty('actualPage');
  });

  it('Morador deve conseguir listar ordens', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .query({
        pageSize: 10,
        pageNumber: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('Deve filtrar ordens por urgência', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .query({
        pageSize: 10,
        pageNumber: 1,
        urgency: URGENCY_HIGH,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    // verificação do filtro
    response.body.data.forEach((order: any) => {
      expect(order.urgency).toBe(URGENCY_HIGH);
    });
  });

  it('Deve filtrar ordens por status', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .query({
        pageSize: 3,
        pageNumber: 1,
        status: STATUS_ORDER_PENDING,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeLessThanOrEqual(3);
    
    // verificação do filtro
    response.body.data.forEach((order: any) => {
      expect(order.status).toBe(STATUS_ORDER_PENDING);
    });
    
  });

  it('Deve dar erro por paginação inválida', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .query({
        pageSize: -1,
        pageNumber: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por filtro de urgência inválido', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .query({
        pageSize: 10,
        pageNumber: 1,
        urgency: 'INVALID_URGENCY',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
