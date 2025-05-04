import request from 'supertest';
import { app } from '@app';

describe('Criação de serviços', () => {

  it('Deve criar um serviço com sucesso', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        name: 'Serviço de Limpeza',
        description: 'Limpeza completa dos espaços comuns',
        cost: 120
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('service');
    expect(response.body.service).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
  });


  it('Não deve permitir criar um serviço se o utilizador não fizer parte do condomínio', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`) // utilizador não está no condomínio
      .send({
        name: 'Serviço X',
        description: 'Teste',
        cost: 50
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });


  it('Não deve permitir criar um serviço com dados inválidos', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        name: 123, // nome inválido
        description: 'Descrição válida',
        cost: '100'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Não deve permitir criar um serviço com admin sem morada', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/services`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        name: 'None',
        description: 'Descrição válida',
        cost: 100
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

});