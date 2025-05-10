import request from 'supertest';
import { app } from '@app';
import { URGENCY_HIGH, URGENCY_LOW, URGENCY_MEDIUM } from '@constants/urgency';
import { ordersCreateController } from './index';
import MockMailProvider from '@providers/implementations/MockMailProvider';

// obtenção da instância do email provider, convertendo-a na minha implementação
// @ts-ignore - acesso de propriedade privada apenas para testing
const mockMailProvider = ordersCreateController.ordersCreateCase.mailProvider as MockMailProvider;

describe('Criação de Ordem', () => {
  describe('Testes com envio de email', () => {
    beforeEach(() => {
      mockMailProvider.clearMessages();
    });

    it('Um admin deve criar uma ordem com sucesso', async () => {
      const response = await request(app)
        .post(`/api/condominium/${global.condominiumId}/orders`)
        .set('Authorization', `Bearer ${global.adminToken}`)
        .send({
          description: 'Ordem de teste',
          urgency: URGENCY_HIGH,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('order');
      expect(response.body.order).toHaveProperty('id');
      expect(response.body).toHaveProperty('message');

      // teste de email sem o uso da infraestrutura
      const messages = mockMailProvider.getMessages();
      expect(messages.length).toBe(1);
      expect(messages[0].to).toBe(global.condominium.email);
      expect(messages[0].cc).toContain(global.admin.email);
    });

    it('Morador deve conseguir criar uma ordem', async () => {
      const response = await request(app)
        .post(`/api/condominium/${global.condominiumId}/orders`)
        .set('Authorization', `Bearer ${global.residentToken}`)
        .send({
          description: 'Ordem de teste morador',
          urgency: URGENCY_MEDIUM,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('order');
      expect(response.body.order).toHaveProperty('id');
      expect(response.body).toHaveProperty('message');
    });
  });
  
  it('Deve dar erro por falta de campos obrigatórios', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        // Missing description
        urgency: URGENCY_LOW,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve dar erro por urgência inválida', async () => {
    const response = await request(app)
      .post(`/api/condominium/${global.condominiumId}/orders`)
      .set('Authorization', `Bearer ${global.adminToken}`)
      .send({
        description: 'Ordem de teste',
        urgency: 'INVALID_URGENCY',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
