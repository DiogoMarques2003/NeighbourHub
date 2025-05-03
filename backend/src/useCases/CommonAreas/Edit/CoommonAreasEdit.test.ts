import request from 'supertest';
import { app } from '@app';
import { resolve } from 'path';

describe('Editar Área Comum', () => {
  const image = resolve(__dirname, '..', '..', '..', '..', 'imagesTest', 'image1.jpg');

  it('Morador não deve conseguir editar uma área comum', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .field('name', 'Área Comum Teste Editada');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Admin deve conseguir editar uma área comum', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('name', 'Área Comum Teste Editada');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('commonArea');
    expect(response.body.commonArea.name).toBe('Área Comum Teste Editada');
  });

  it('Admin deve conseguir adicionar imagens a uma área comum', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .attach('imagesAdd', image);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('commonArea');
    expect(response.body.commonArea.images.length).toBe(2);
  });

  it('Admin deve conseguir remover imagens de uma área comum', async () => {
    const response = await request(app)
      .put(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('imagesRemove', [global.commonArea.images[0]]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('commonArea');
    expect(response.body.commonArea.images.length).toBe(1);
  });
});
