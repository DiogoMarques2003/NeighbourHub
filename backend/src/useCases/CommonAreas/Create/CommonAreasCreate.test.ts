import request from 'supertest';
import { app } from '@app';
import { resolve } from 'path';

describe('Criação de Área Comum', () => {
  const image = resolve(__dirname, '..', '..', '..', '..', 'imagesTest', 'image1.jpg');

  it('Deve criar uma área comum com sucesso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .attach('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '08:00')
      .field('endSchedule', '22:00');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commonArea');
    expect(response.body.commonArea).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
  });

  it('Morador não deve conseguir criar uma área comum', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '08:00')
      .field('endSchedule', '22:00');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por falta de campos obrigatórios', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por o startSchedule ser maior que o endSchedule', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/commonarea`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .field('images', image)
      .field('name', 'Área Comum Teste')
      .field('cost', 100)
      .field('rules', 'Regras da área comum')
      .field('capacity', 10)
      .field('type', 1)
      .field('startSchedule', '22:00')
      .field('endSchedule', '08:00');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
