import request from 'supertest';
import { app } from '@app';

describe('Eliminar uma Requsição de serviços', () => {
  
  it('Deve eliminar um pedido com sucesso', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
  
  it('Não deve conseguir eliminar um pedido com estado "completo"', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqCompleted.id}`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Dono do serviço deve eliminar um pedido com sucesso', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending2.id}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

});