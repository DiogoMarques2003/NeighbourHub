import { useEffect, useState } from 'react';
import Popup from '@common/Popup';
import ErrorBar from '@common/ErrorBar.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import requestService from '@services/requestService.js';
import { dateFormat } from '@utils/helperFunctions.js';
import Pagination from '@common/Pagination';
import { REQUEST_SERVICE_STATUS } from '@utils/constants';

const MyServiceRequestPopUp = ({ openPopup, setPopup }) => {
  const { condominiumId, serviceId } = useParams();
  const [requestData, setRequestData] = useState([]);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDataServices = async () => {
      const result = await requestService.getServiceRequests(condominiumId, serviceId, { pageNumber, pageSize: 5 });
      console.log('result: ', result.data);

      if (result?.error || !result) {
        setError(result?.error || 'Não foi possivel encontrar condominios');
        setIsLoading(false);
        setRequestData([]);
        return;
      }

      setRequestData(result.data);
      setTotalPage(result.pages);
      setIsLoading(false);
    };

    getDataServices();
  }, [pageNumber]);

  const handleRemovePopUp = () => {
    setError('');
    setPopup(false);
  };

  return (
    <>
      <Popup
        openPopUp={openPopup}
        closePopUp={handleRemovePopUp}
        popupTitle={'Pedidos do serviço'}
        classNamePopUp="max-w-[50vw] max-h-[90vh] z-10"
      >
        {error && <ErrorBar error={error} />}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto text-left">
            <thead className="uppercase bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">Data</th>
                <th className="px-6 py-3 whitespace-nowrap">Estado</th>
                <th className="px-6 py-3 whitespace-nowrap">Nome</th>
                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`request/${item.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{dateFormat(new Date(item.requestDate), true)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{REQUEST_SERVICE_STATUS[item.status]}</td>
                  <td className="px-6 py-4 break-words">{item.user.name}</td>
                  <td className="px-6 py-4 break-words">{item.user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          className={'justify-center'}
          currentPage={pageNumber}
          maxPage={totalPage}
          setCurrentPage={setPageNumber}
        />
      </Popup>
    </>
  );
};

export default MyServiceRequestPopUp;
