import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ScrollableList from '../common/ScrollableList';
import ordersService from '../../services/orders';
import OrderCard from '../features/orders/orderCard';
import DropDown from '../common/DropDown';
import { AlarmClock, Tags } from 'lucide-react';

const OrdersLayout = () => {
  const navigate = useNavigate();
  const { currentUser, condominium } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState('ALL');

  const statusOptions = [
    { code: 'ALL', description: 'Todos' },
    { code: 'PENDING', description: 'Pendente' },
    { code: 'VOTING', description: 'Em Votação' },
    { code: 'IN_PROGRESS', description: 'Em Progresso' },
    { code: 'COMPLETED', description: 'Concluído' },
    { code: 'CANCELLED', description: 'Cancelado' },
  ];

  const urgencyOptions = [
    { code: 'ALL', description: 'Todos' },
    { code: 'LOW', description: 'Baixa' },
    { code: 'MEDIUM', description: 'Média' },
    { code: 'HIGH', description: 'Alta' },
  ];

  const filteredOrders = orders.filter((order) => {
    const statusMatch = selectedStatus !== 'ALL' ? order.status === selectedStatus : true;
    const urgencyMatch = selectedUrgency !== 'ALL' ? order.urgency === selectedUrgency : true;
    return statusMatch && urgencyMatch;
  });

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);

      const data = await ordersService.getOrders(condominium.id, { pageNumber, pageSize: 3 });
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
              <DropDown
                listOptions={statusOptions}
                setChoice={setSelectedStatus}
                choice={selectedStatus}
                dropBoxPlaceHolder="Status"
                icon={Tags}
              />

              {/* Filtro de Urgência */}
              <DropDown
                listOptions={urgencyOptions}
                setChoice={setSelectedUrgency}
                choice={selectedUrgency}
                dropBoxPlaceHolder="Urgência"
                icon={AlarmClock}
              />
            </div>
          </div>

          <ScrollableList
            items={filteredOrders}
            renderItem={(item) => <OrderCard order={item} />}
            setPageNumber={setPageNumber}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersLayout;
