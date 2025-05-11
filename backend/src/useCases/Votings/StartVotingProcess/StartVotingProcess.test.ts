import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH, URGENCY_LOW, URGENCY_MEDIUM } from '@constants/urgency';
import MockMailProvider from '@providers/implementations/MockMailProvider';
import { votingCreateController } from './index';
import { STATUS_ORDER_PENDING } from '@constants/status';

// obtenção da instância do email provider, convertendo-a na minha implementação
// @ts-ignore - acesso de propriedade privada apenas para testing
const mockMailProvider = votingCreateController.votingCreateCase.mailProvider as MockMailProvider;

describe('Início do processo de votação', () => {
  describe('Testes com envio de email', () => {
    beforeEach(() => {
      mockMailProvider.clearMessages();
    });

    it('O admin deve conseguir iniciar a votação com budgets', async () => {
      const response = await request(app)
        .post(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrder2Id}/voting`)
        .set('Authorization', `Bearer ${global.adminToken}`)
        .send({
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // daqui a 7 dias
          budgets: [
            {
              description: 'sonae',
              amount: 20,
            },
            {
              description: 'solinca',
              amount: 50,
            },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('order');
      expect(response.body.order).toHaveProperty('id');
      expect(response.body).toHaveProperty('message');

      // teste de email sem o uso da infraestrutura
      const messages = mockMailProvider.getMessages();
      expect(messages.length).toBe(1);
      expect(messages[0].to).toBe(global.condominium.email);
      expect(messages[0].cc).toContain(global.resident.email);
    });

    it('O admin deve conseguir iniciar a votação sem budgets', async () => {
      // update do estado antes do teste
      await global.prisma.orders.update({ where: { id: pendingOrder2Id }, data: { status: STATUS_ORDER_PENDING } });

      const response = await request(app)
        .post(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrder2Id}/voting`)
        .set('Authorization', `Bearer ${global.adminToken}`)
        .send({
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // daqui a 7 dias
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');

      // teste de email sem o uso da infraestrutura
      const messages = mockMailProvider.getMessages();
      expect(messages.length).toBe(1);
      expect(messages[0].to).toBe(global.condominium.email);
      expect(messages[0].cc).toContain(global.resident.email);
    });
  });

  it('O morador não deve conseguir iniciar a votação', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.pendingOrder2Id}/voting`)
      .set('Authorization', `Bearer ${global.residentToken}`)
      .send({
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // daqui a 7 dias
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('O admin não deve conseguir iniciar a votação para uma ordem diferente de pending', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders/${global.inProgressOrderId}/voting`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // daqui a 7 dias
        budgets: [
          {
            description: 'sonae',
            amount: 20,
          },
          {
            description: 'solinca',
            amount: 50,
          },
        ],
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
