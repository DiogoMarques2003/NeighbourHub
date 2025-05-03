import request from 'supertest';
import { app } from '@app';
import { v4 as uuid } from 'uuid';

describe('Obter Área Comum por id', () => {
  it('Admin deve conseguir obter uma área comum por id', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Morador deve conseguir obter uma área comum por id', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar erro se a área comum não existir', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/commonarea/${uuid()}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
