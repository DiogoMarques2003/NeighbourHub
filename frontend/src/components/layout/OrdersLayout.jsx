import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ScrollableList from '../common/ScrollableList';
import ordersService from '../../services/orders';
import OrderCard from '../features/orders/orderCard';
import DropDown from '../common/DropDown';
import { AlarmClock, Tags } from 'lucide-react';
import Title from '@common/Title';
import TitleWithAddButton from '@common/TitleWithAddButton';
import Button from '@common/Button';

const OrdersLayout = () => {
  const navigate = useNavigate();
  const { currentUser, condominium } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState('ALL');

  const [openPopup, setOpenPopup] = useState(false);

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

  function onAddClick() {
    navigate('create');
  }

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);

      const data = await ordersService.getOrders(condominium.id, { pageNumber, pageSize: 5 });
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
    <>
      {loading && orders.length === 0 ? (
        <Loading className="flex justify-center" />
      ) : (
        <div>
          <TitleWithAddButton title="Pedidos" onAddClick={condominium.isResident && onAddClick} />

          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <DropDown
              listOptions={statusOptions}
              setChoice={setSelectedStatus}
              choice={selectedStatus}
              dropBoxPlaceHolder="Status"
              icon={Tags}
            />

            <DropDown
              listOptions={urgencyOptions}
              setChoice={setSelectedUrgency}
              choice={selectedUrgency}
              dropBoxPlaceHolder="Urgência"
              icon={AlarmClock}
            />
          </div>
          <ScrollableList
            items={filteredOrders}
            renderItem={(item) => <OrderCard order={item} />}
            setPageNumber={setPageNumber}
            hasMore={hasMore}
          />
        </div>
      )}
    </>
  );
};

export default OrdersLayout;
