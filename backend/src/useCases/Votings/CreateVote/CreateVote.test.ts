import request from 'supertest';
import { app } from '@app';

describe('Criação de voto', () => {
  it('Um morador do condomínio deve conseguir votar numa ordem com budgets', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderWithBudgetsId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
        budgetID: global.budget2Id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('voting');
    expect(response.body).toHaveProperty('message');
  });

  it('Um morador do condomínio pode alterar o seu voto mesmo já tendo escolhido um budget', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderWithBudgetsId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
        budgetID: global.budget2Id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });

  it('Um morador do condomínio deve conseguir votar numa ordem sem budgets', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderWithoutBudgetsId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('voting');
    expect(response.body).toHaveProperty('message');
  });

  it('Uma conta que não faça parte como morador do condomínio não deve conseguir votar', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderWithoutBudgetsId}/vote`)
      .set('Authorization', `Bearer ${global.nonResidentToken}`)
      .send({
        decision: true,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Um morador do condomínio pode conseguir votar numa ordem sem budgets que já tenha votado antes, alterando o seu voto', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderWithoutBudgetsId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });

  it('Um morador do condomínio não deve conseguir votar numa ordem com o status indisponível para votação', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.inProgressOrderId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('Um morador do condomínio não deve conseguir votar numa ordem onde a deadline já passou', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.votingOrderDeadLineGoneId}/vote`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        decision: true,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
