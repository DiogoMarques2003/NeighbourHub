import { useEffect, useState } from 'react';
import { useAuthContext } from '@hooks/useAuthContext';
import servicesService from '@services/servicesService';
import { useNavigate, useParams } from 'react-router-dom';
import ordersService from '@services/orders';
import commonAreaService from '@services/commonAreaService';

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const { condominiumId: condominiumIdFromUrl } = useParams();
  const navigate = useNavigate();

  const condominiumId = currentUser?.condominium?.id || condominiumIdFromUrl;

  const [orders, setOrders] = useState([]);
  const [commonAreas, setCommonAreas] = useState([]);
  const [services, setServices] = useState([]);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    if (!condominiumId) return;

    async function fetchOrders() {
      setLoadingOrders(true);
      const data = await ordersService.getOrders(condominiumId, { pageNumber: 1, pageSize: 5 });
      if (data && !data.error) {
        setOrders(data.data || []);
      }
      setLoadingOrders(false);
    }

    async function fetchCommonAreas() {
      setLoadingAreas(true);
      const data = await commonAreaService.getCommonAreasByCondominiumId(condominiumId, { pageNumber: 1, pageSize: 5 });
      if (data && !data.error) {
        setCommonAreas(data.data || []);
      }
      setLoadingAreas(false);
    }

    async function fetchServices() {
      setLoadingServices(true);
      const data = await servicesService.getServices(condominiumId, { pageNumber: 1, pageSize: 5 });
      if (data && !data.error) {
        setServices(data.data || []);
      }
      setLoadingServices(false);
    }

    fetchOrders();
    fetchCommonAreas();
    fetchServices();
  }, [condominiumId]);

  const renderOrderCard = (order) => (
    <div key={order.id} className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg mb-2">Pedido</h3>
      <p className="text-gray-700 mb-2">{order.title || 'Sem título'}</p>
      <div className="text-sm space-y-1">
        <p>
          <strong>Urgência:</strong>{' '}
          <span
            className={
              order.urgency === 'LOW'
                ? 'text-green-500'
                : order.urgency === 'MEDIUM'
                ? 'text-yellow-500'
                : 'text-red-500'
            }
          >
            {order.urgency === 'LOW' ? 'Baixa' : order.urgency === 'MEDIUM' ? 'Média' : 'Alta'}
          </span>
        </p>
        <p>
          <strong>Deadline:</strong> {order.deadline ? new Date(order.deadline).toLocaleDateString() : 'N/A'}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={
              order.status === 'PENDING'
                ? 'text-yellow-500'
                : order.status === 'COMPLETED'
                ? 'text-green-600'
                : 'text-gray-600'
            }
          >
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );

  const renderCommonAreaCard = (area) => (
    <div key={area.id} className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{area.name}</h3>
        <p className="text-gray-500 mb-2">{area.category || 'Categoria Desconhecida'}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>⏰</strong>{' '}
            {area.startSchedule && area.endSchedule
              ? `${area.startSchedule} - ${area.endSchedule}`
              : 'Horário Indisponível'}
          </p>
          <p>
            <strong>👥</strong> {area.capacity || 'N/A'}
          </p>
          <p>
            <strong>💶</strong> {area.cost ? `${area.cost.toFixed(2)}€` : 'Grátis'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderServiceCard = (service) => (
    <div key={service.id} className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg mb-1">{service.name}</h3>
      <p className="text-gray-700 mb-2">{service.description}</p>
      <div className="flex items-center gap-1 text-yellow-500">
        {service.avgReview ? (
          [...Array(5)].map((_, index) => <span key={index}>{index < Math.round(service.avgReview) ? '★' : '☆'}</span>)
        ) : (
          <p className="text-gray-400 text-sm">Sem Avaliações</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#3e94bf] mb-8">
        Bem-vindo ao seu condomínio {currentUser.name || 'Sem Nome'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna Pedidos */}
        <div className="border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#3e94bf]">Pedidos Recentes</h2>
            <button
              onClick={() => navigate(`/condominium/${condominiumId}/orders`)}
              className="text-sm text-[#3e94bf] hover:underline"
            >
              Ver Todos
            </button>
          </div>

          {loadingOrders ? (
            <p className="text-gray-500">A carregar pedidos...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-400">Nenhum pedido encontrado.</p>
          ) : (
            <div className="flex flex-col gap-4">{orders.map(renderOrderCard)}</div>
          )}
        </div>

        {/* Coluna Espaços */}
        <div className="border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#3e94bf]">Espaços Recentes</h2>
            <button
              onClick={() => navigate(`/condominium/${condominiumId}/commonarea`)}
              className="text-sm text-[#3e94bf] hover:underline"
            >
              Ver Todos
            </button>
          </div>

          {loadingAreas ? (
            <p className="text-gray-500">A carregar espaços...</p>
          ) : commonAreas.length === 0 ? (
            <p className="text-gray-400">Nenhum espaço encontrado.</p>
          ) : (
            <div className="flex flex-col gap-4">{commonAreas.map(renderCommonAreaCard)}</div>
          )}
        </div>

        {/* Coluna Serviços */}
        <div className="border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#3e94bf]">Serviços Recentes</h2>
            <button
              onClick={() => navigate(`/condominium/${condominiumId}/services`)}
              className="text-sm text-[#3e94bf] hover:underline"
            >
              Ver Todos
            </button>
          </div>

          {loadingServices ? (
            <p className="text-gray-500">A carregar serviços...</p>
          ) : services.length === 0 ? (
            <p className="text-gray-400">Nenhum serviço encontrado.</p>
          ) : (
            <div className="flex flex-col gap-4">{services.map(renderServiceCard)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
