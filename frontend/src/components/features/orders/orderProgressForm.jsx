import { useEffect, useState } from 'react';
import orderWorkService from '@services/orderWorkService.js';
import { useParams } from 'react-router-dom';
import GoBack from '@common/GoBack.jsx';
import Button from '@common/Button.jsx';
import OrderWorkPopup from '@features/orders/OrderWorkPopup.jsx';

const OrderProgressForm = () => {
  const { condominiumId, orderId } = useParams();
  const [orderWork, setOrderWork] = useState({});

  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await orderWorkService.getOrderWork(condominiumId, orderId);
      console.log(result);
      if (result?.error) {
        setError(result?.error);
      } else {
        setOrderWork(result.data);
      }

      setLoading(false);

    };

    getData();
  }, []);

  return (
    <>
      <GoBack />
      <Button onClick={() =>
        setOpenPopup(true)
      }>
        Atualizar pedido
      </Button>

      <OrderWorkPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
};

export default OrderProgressForm;