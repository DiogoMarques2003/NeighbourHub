import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ScrollableList from '../common/ScrollableList';
import ordersService from '../../services/orders';
import OrderCard from '../features/orders/orderCard';

const OrdersLayout = () => {
  const navigate = useNavigate();
  const { currentUser, condominium } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');

  const filteredOrders = orders.filter((order) => {
    const statusMatch = selectedStatus ? order.status === selectedStatus : true;
    const urgencyMatch = selectedUrgency ? order.urgency === selectedUrgency : true;
    return statusMatch && urgencyMatch;
  });

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);

      const data = await ordersService.getOrders(condominium.id, { pageNumber, pageSize: 3 });
      console.log(data.data);
      setLoading(false);

      if (!data || data?.error) {
        return;
      }

      setOrders((prev) => [...prev, ...data.data]);
      setHasMore(data.actualPage < data.pages);
    }

    fetchOrders();
  }, [condominium.id, pageNumber]);

  return (
    <div className="p-4">
      {loading ? (
        <Loading className="flex justify-center" />
      ) : (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800" style={{ color: 'rgb(62, 148, 191)' }}>
              Pedidos
            </h1>

            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* Filtro de Status */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md p-2 text-sm text-gray-700"
              >
                <option value="">Todos os Status</option>
                <option value="PENDING">Pendente</option>
                <option value="VOTING">Em Votação</option>
                <option value="IN_PROGRESS">Em Progresso</option>
                <option value="COMPLETED">Concluído</option>
                <option value="CANCELLED">Cancelado</option>
              </select>

              {/* Filtro de Urgência */}
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="border rounded-md p-2 text-sm text-gray-700"
              >
                <option value="">Todas as Urgências</option>
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
          </div>

          <ScrollableList
            items={filteredOrders}
            renderItem={(item) => <OrderCard area={item} />}
            setPageNumber={setPageNumber}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersLayout;
