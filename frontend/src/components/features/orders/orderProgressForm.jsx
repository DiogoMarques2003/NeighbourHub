import { useEffect, useState } from 'react';
import orderWorkService from '@services/orderWorkService.js';
import { useOutletContext, useParams } from 'react-router-dom';
import OrderWorkPopup from '@features/orders/OrderWorkPopup.jsx';
import MultiStepProgress from '@common/MultiStepProgress';
import Loading from '@common/Loading';
import ErrorBar from '@common/ErrorBar';
import Pagination from '@common/Pagination';
import DropDown from '@common/DropDown.jsx';
import { ORDER_WORK_STATUS } from '@utils/constants.js';
import { AlarmClock, Circle } from 'lucide-react';
import CheckBox from '@common/CheckBox.jsx';

const OrderProgressForm = ({ openPopup, setOpenPopup }) => {
  const { condominiumId, orderId } = useParams();
  const { isAdmin, currentUser } = useOutletContext();
  const [orderWork, setOrderWork] = useState([]);
  const [orderWorkClick, setOrderWorkClick] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await orderWorkService.getOrderWork(condominiumId, orderId, {
        pageNumber: page,
        pageSize: 4,
        status: selectedStatus,
        ...(checkbox && { hasReport: checkbox }),
      });
      if (result?.error) {
        setOrderWork([]);
        setError(result?.error);
      } else {
        setError('');
        setOrderWork(result.data);
        setTotalPages(result.pages);
      }
      setLoading(false);
    };

    getData();
  }, [page, openPopup, checkbox, selectedStatus]);

  return (
    <>
      {loading ? (
        <div class="items-center flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-5">
            <DropDown
              listOptions={{ '': 'Todos', ...ORDER_WORK_STATUS }}
              setChoice={setSelectedStatus}
              choice={selectedStatus}
              dropBoxPlaceHolder="Estado"
              icon={Circle}
            />
            <CheckBox
              className="pt-4"
              description="Apenas Arquivos"
              checkBox={checkbox}
              handleCheckbox={setCheckbox}
            />
          </div>
          <ErrorBar error={error} />
          <MultiStepProgress updates={orderWork} setItemClick={setOrderWorkClick}
                             setOpenPopup={setOpenPopup}></MultiStepProgress>
          <OrderWorkPopup openPopup={openPopup} setOpenPopup={setOpenPopup} updateMode={(orderWorkClick && true)}
                          orderClick={orderWorkClick} setOrderClick={setOrderWorkClick} />
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
