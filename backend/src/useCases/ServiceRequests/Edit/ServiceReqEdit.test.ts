import request from 'supertest';
import { app } from '@app';
import { STATUS, STATUS_REQ_APPROVED } from '@constants/status';

describe('Edição uma Requsição de serviços', () => {
  
  it('Dono do serviço deve editar um pedido com sucesso', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        status: STATUS_REQ_APPROVED
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('serviceRequest');
    expect(response.body).toHaveProperty('message') ;
  });
  
  
  it('Requisitante não deve conseguir editar um pedido', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}/request/${global.serviceReqPending.id}`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        status: STATUS_REQ_APPROVED
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
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