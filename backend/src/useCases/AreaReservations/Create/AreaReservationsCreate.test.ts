import request from 'supertest';
import { app } from '@app';

describe('Criação de uma reserva de área comum', () => {
  it('Deve criar uma reserva de área comum com sucesso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-01-02T10:00:00'),
        endDate: new Date('2026-01-02T12:00:00'),
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('areaReserv');
    expect(response.body.areaReserv).toHaveProperty('id');
  });
  it('Deve falhar ao criar uma reserva de área comum com datas inválidas', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('01-01-2025T11:00:00'),
        endDate: new Date('01-01-2025T12:00:00'),
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve falhar ao tentar criar reserva sem data de fim', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        startDate: new Date('2026-01-02T10:00:00'),
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
  it('Não deve permitir reserva por utilizador que não é morador do condomínio', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`)
      .send({
        startDate: new Date('2026-01-05T10:00:00'),
        endDate: new Date('2026-01-05T11:00:00'),
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
