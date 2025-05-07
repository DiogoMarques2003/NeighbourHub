import request from 'supertest';
import { app } from '@app';

describe('Remoção de uma reserva de área comum', () => {
    it('Deve permitir que o morador remova a sua reserva com sucesso', async () => {
        const reservationId = 'someReservationId'; 
        const response = await request(app)
          .delete(`/api/condominium/${global.condominiumId}/commonarea/${global.commonAreaId}/reservation/${global.reservationId}`)
          .set('Authorization', `Bearer ${global.adminToken}`);
        
        expect(response.status).toBe(200);
        console.log(response.body);
        expect(response.body).toHaveProperty('message');
         expect(response.body.message).toBe('Reserva apagada com sucesso');
    });
});