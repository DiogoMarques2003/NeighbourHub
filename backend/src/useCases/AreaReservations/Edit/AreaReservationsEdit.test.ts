import request from 'supertest';
import { app } from '@app';

describe('Edição de uma reserva de área comum', () => {
  let reservationId: string;

  beforeAll(async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-04-01T10:00:00'),
        endDate: new Date('2026-04-01T12:00:00'),
      });

    reservationId = response.body.areaReserv.id;
    expect(reservationId).toBeDefined();
  });

  it('Deve permitir que o morador edite a sua reserva com sucesso', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-04-01T14:00:00'),
        endDate: new Date('2026-04-01T16:00:00'),
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve falhar se o usuário tentar editar com datas inválidas', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-04-01T18:00:00'),
        endDate: new Date('2026-04-01T16:00:00'), // fim antes do início
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Não deve permitir que outro usuário edite a reserva', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`)
      .send({
        startDate: new Date('2026-04-01T17:00:00'),
        endDate: new Date('2026-04-01T19:00:00'),
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve permitir que o admin atualize o status da reserva', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: 'PENDING',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

});
