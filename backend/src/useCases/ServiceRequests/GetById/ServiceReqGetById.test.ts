import request from 'supertest';
import { app } from '@app';
import { STATUS, STATUS_REQ_APPROVED } from '@constants/status';

describe('Obter uma Requsição de serviço', () => {
  
  it('Dono do serviço deve conseguir um pedido com sucesso', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id') ;
  });
  
  
  it('Requisitante deve conseguir obter o seu pedido com sucesso', async () => {
    const response = await request(app)
      .get(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id') ;
  });
  

  it('Admin não deve conseguir editar um pedido', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        status: STATUS_REQ_APPROVED
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

});