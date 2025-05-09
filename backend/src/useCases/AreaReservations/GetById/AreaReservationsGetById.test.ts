import request from 'supertest';
import { app } from '@app';
import { v4 as uuid } from 'uuid';

describe('Obter reserva de área comum por ID', () => {
  let reservationId: string;

  beforeAll(async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-07-01T10:00:00'),
        endDate: new Date('2026-07-01T12:00:00'),
      });

    reservationId = response.body.areaReserv.id;
    expect(reservationId).toBeDefined();
  });

  it('Admin deve conseguir obter a reserva por ID', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Morador deve conseguir obter a própria reserva por ID', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar 404 para reserva inexistente', async () => {
    const fakeId = uuid();

    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${fakeId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir acessar reserva de outro morador', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
