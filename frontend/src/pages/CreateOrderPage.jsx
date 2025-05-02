import { useOutletContext } from 'react-router-dom';
import Title from '../components/common/Title';
import CreateOrderForm from '@features/orders/createOrderForm';

const createOrderPage = () => {
  const { currentUser, condominuim, isAdmin } = useOutletContext();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: '#3e94bf' }}>
        Criar Pedido
      </h1>
      <CreateOrderForm />
    </div>
  );
};

export default createOrderPage;
