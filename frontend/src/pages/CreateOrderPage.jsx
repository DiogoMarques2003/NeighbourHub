import { useOutletContext } from 'react-router-dom';
import Title from '../components/common/Title';
import CreateOrderForm from '@features/orders/createOrderForm';

const createOrderPage = () => {
  const { currentUser, condominuim, isAdmin } = useOutletContext();

  return (
    <div>
      <Title title="Criar Pedido" />
      <CreateOrderForm />
    </div>
  );
};

export default createOrderPage;
