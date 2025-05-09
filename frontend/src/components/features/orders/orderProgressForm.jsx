import { useEffect, useState } from 'react';
import orderWorkService from '@services/orderWorkService.js';
import { useParams } from 'react-router-dom';
import OrderWorkPopup from '@features/orders/OrderWorkPopup.jsx';
import MultiStepProgress from '@common/MultiStepProgress';
import Loading from '@common/Loading';
import ErrorBar from '@common/ErrorBar';
import Pagination from '@common/Pagination';

const OrderProgressForm = ({ openPopup, setOpenPopup }) => {
  const { condominiumId, orderId } = useParams();
  const [orderWork, setOrderWork] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await orderWorkService.getOrderWork(condominiumId, orderId, {
        pageNumber: page,
        pageSize: 4,
      });
      console.log(result);
      if (result?.error) {
        setError(result?.error);
      } else {
        setError('');
        setOrderWork(result.data);
        setTotalPages(result.pages);
      }
      setLoading(false);
    };

    getData();
  }, [page]);

  return (
    <>
      {loading ? (
        <div class="items-center flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <ErrorBar error={error} />
          <MultiStepProgress updates={orderWork}></MultiStepProgress>
          <OrderWorkPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
          <Pagination
            className={'justify-center mt-5'}
            currentPage={page}
            maxPage={totalPages}
            setCurrentPage={setPage}
          />
        </>
      )}
    </>
  );
};

export default OrderProgressForm;
