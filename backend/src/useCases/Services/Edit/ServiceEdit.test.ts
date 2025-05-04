import request from 'supertest';
import { app } from '@app';
import Services from '@entities/Services';

describe('Editar serviços', () => {

  it('Morador do serviço deve conseguir editar o proprio serviço', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        name: 'Serviço de Canalização',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('service');
    expect(response.body.service.name).toBe('Serviço de Canalização');
    expect(response.body).toHaveProperty('message');
  });

  it('Admin não deve conseguir editar os serviços', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        name: 'Serviço de Canalização',
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir editar serviços de outros moradores', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/services/${global.service.id}`)
      .set('Authorization', `Bearer ${global.resident2Token}`)
      .send({
        name: 'Serviço de Canalização',
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

});