import request from 'supertest';
import { app } from '@app';

describe('Remoção de uma reserva de área comum', () => {
  let reservationId: string;

  beforeAll(async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-02-10T10:00:00'),
        endDate: new Date('2026-02-10T12:00:00'),
      });

    reservationId = response.body.areaReserv.id;
    expect(reservationId).toBeDefined();
  });

  it('Deve permitir que o morador remova a sua reserva com sucesso', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Reserva apagada com sucesso');
  });

  it('Não deve permitir que admin remova a reserva de outro morador', async () => {
    const res = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-02-11T10:00:00'),
        endDate: new Date('2026-02-11T12:00:00'),
      });

    const otherReservationId = res.body.areaReserv.id;

    const deleteResponse = await request(app)
      .delete(
        `/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${otherReservationId}`
      )
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body).toHaveProperty('message');
  });
});
