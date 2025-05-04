import request from 'supertest';
import { app } from '@app';

describe('Obter serviços', () => {

  it('Morador deve conseguir obter qualquer serviço', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/services/${global.service.id}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Não morador não deve conseguir obter serviços do condominio', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/services/${global.service.id}`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});