import request from 'supertest';
import { app } from '@app';
import * as console from 'node:console';

describe('Requisitar serviços', () => {

  it('Morador deve conseguir requisitar serviços', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('servReq');
    expect(response.body).toHaveProperty('message');
  });


  it('Dono do serviço não deve conseguir requisitar proprio serviço', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});