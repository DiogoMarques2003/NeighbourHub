import request from 'supertest';
import { app } from '@app';
import Services from '@entities/Services';

describe('Eliminar serviços', () => {

  let serviceIdAdmin: string;
  let serviceId: string;

  beforeAll(async () => {
    const service = new Services({
      name: 'Limpeza',
      cost: 120,
      description: 'Limpo tudo',
      ownerId: global.residentId,
      condominiumId: global.condominiumId,
    });
    const serviceAdmin = new Services({
      name: 'Limpeza',
      cost: 120,
      description: 'Limpo tudo',
      ownerId: global.residentId,
      condominiumId: global.condominiumId,
    });
    await global.prisma.services.createMany({ data: [ service, serviceAdmin ] });
    serviceId = service.id;
    serviceIdAdmin = serviceAdmin.id;
  });

  it('Morador não deve eliminar um serviço de outro morador', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${serviceId}`)
      .set('Authorization', `Bearer ${global.resident2Token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Admin deve eliminar um serviço de um morador com sucesso', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${serviceIdAdmin}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve eliminar um serviço com sucesso', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/services/${serviceId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

});