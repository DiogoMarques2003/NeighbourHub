import request from 'supertest';
import { app } from '@app';

describe('Avaliar serviços', () => {

  it('Morador deve conseguir avaliar serviços depois de completos', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqCompleted.id}/review`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        comment: 'test',
        rating: 2,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('servRev');
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir avaliar serviços completos mias que uma vez', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqCompleted.id}/review`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        comment: 'test',
        rating: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir avaliar serviços antes de completos', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}/review`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        comment: 'test',
        rating: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Dono do serviço não deve conseguir avaliar os seus serviços', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqCompleted.id}/review`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        comment: 'test',
        rating: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});