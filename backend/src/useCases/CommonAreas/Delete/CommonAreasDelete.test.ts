import request from 'supertest';
import { app } from '@app';
import { v4 as uuid } from 'uuid';
import CommonAreas from '@entities/CommonAreas';
import { STATUS_READY } from '@constants/status';

describe('Apagar Área Comum', () => {
  let commonAreaId: string;

  beforeAll(async () => {
    const commonArea = new CommonAreas({
      name: 'Área Comum Teste',
      capacity: 10,
      condominiumId: global.condominiumId,
      endSchedule: '22:00',
      startSchedule: '08:00',
      images: ['/files/commonAreasPictures/teste.jpg'],
      cost: 10,
      rules: 'Regras da área comum',
      status: STATUS_READY,
      type: 2,
    });
    await global.prisma.commonAreas.create({ data: commonArea });
    commonAreaId = commonArea.id;
  });

  it('Morador não deve conseguir apagar uma área comum', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/commonarea/${commonAreaId}`)
      .set('Authorization', `Bearer ${global.residentToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Admin deve conseguir apagar uma área comum', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/commonarea/${commonAreaId}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve retornar erro se a área comum não existir', async () => {
    const response = await request(app)
      .delete(`/api/condominium/${global.condominiumId}/commonarea/${uuid()}`)
      .set('Authorization', `Bearer ${global.adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
