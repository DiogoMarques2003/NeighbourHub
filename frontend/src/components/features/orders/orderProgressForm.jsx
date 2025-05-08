import { useEffect, useState } from 'react';
import orderWorkService from '@services/orderWorkService.js';
import { useParams } from 'react-router-dom';
import GoBack from '@common/GoBack.jsx';
import Button from '@common/Button.jsx';
import OrderWorkPopup from '@features/orders/OrderWorkPopup.jsx';
import MultiStepProgress from '@common/MultiStepProgress';
import Loading from '@common/Loading';
import ErrorBar from '@common/ErrorBar';

const OrderProgressForm = ({ openPopup, setOpenPopup }) => {
  const { condominiumId, orderId } = useParams();
  const [orderWork, setOrderWork] = useState([]);

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
      {loading ? (
        <div class="items-center flex justify-center">
          <Loading />
        </div>
      ) : error ? (
        <ErrorBar error={error} />
      ) : (
        <>
          <MultiStepProgress updates={orderWork}></MultiStepProgress>
          <OrderWorkPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </>
      )}
    </>
  );
};

export default OrderProgressForm;
