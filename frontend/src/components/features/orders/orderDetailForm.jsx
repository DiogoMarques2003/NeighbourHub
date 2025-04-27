import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ordersService from '@services/orders';
import { dateFormat } from '@utils/helperFunctions';
import defaultAvatar from '@public/images/defaultUserAvatar.jpg';

const OrderDetailsForm = () => {
  const { condominiumId, orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await ordersService.getOrderById(condominiumId, orderId);

      if (result?.error) {
        setError(result.error);
      } else {
        dateFormat(new Date(result.createdAt));
        setOrder(result);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [condominiumId, orderId]);

  if (loading) return <p className="p-8 text-gray-500">A carregar...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!order) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: '#3e94bf' }}>
        Detalhes do Pedido
      </h1>

      <div className="flex gap-10">
        {/* Caixa da Esquerda */}
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Descrição
          </h2>
          <div className="text-gray-700 mb-2">{order.description}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Urgência
          </h2>
          <div className="text-gray-700 mb-2">{order.urgency}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Requisitante
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={order.user.foto || defaultAvatar}
              alt="Foto de perfil"
              className="w-16 h-16 object-cover rounded-full border"
            />
            <div className="text-gray-700 mb-2">
              <b>Nome:</b> {order.user.name} <p />
              <b>Email:</b> {order.user.email} <p />
              <b>Nº Telemóvel:</b> {order.user.phoneNumber}
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Orçamento aceite
          </h2>
          <div className="text-gray-700 mb-2">Mostrar isto no fim da votação só</div>
        </div>

        {/* Caixa da Direita */}
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Status
          </h2>
          <div className="text-gray-700 mb-2">{order.status}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Data do Pedido
          </h2>
          <div className="text-gray-700 mb-2">{order.createdAt ? dateFormat(new Date(order.createdAt)) : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
