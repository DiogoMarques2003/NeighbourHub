import { useEffect, useState } from 'react';
import Popup from '@common/Popup';
import ErrorBar from '@common/ErrorBar.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import requestService from '@services/requestService.js';
import { dateFormat } from '@utils/helperFunctions.js';

const MyServiceRequestPopUp = ({ openPopup, setPopup }) => {
  const { condominiumId, serviceId } = useParams();
  const [requestData, setRequestData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDataServices = async () => {
      const result = await requestService.getServiceRequests(condominiumId, serviceId);
      console.log('result: ', result.data);

      if (result?.error || !result) {
        setError(result?.error || 'Não foi possivel encontrar condominios');
        setIsLoading(false);
        setRequestData([]);
        return;
      }

      setRequestData(result.data);
      setIsLoading(false);
    };

    getDataServices();
  }, []);

  const handleRemovePopUp = () => {
    setError('');
    setPopup(false);
  };

  return (
    <>
      <Popup openPopUp={openPopup} closePopUp={handleRemovePopUp} popupTitle={'Pedidos do serviço'} classNamePopUp="max-w-[50vw] max-h-[90vh] z-10">
        {error && <ErrorBar error={error} />}
        <div className="overflow-x-auto">
          <table className=" table-fixed text-left md:table-fixed w-full">
            <thead className="uppercase bg-gray-50 text-gray-500 ">
            <tr>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Telefone</th>
            </tr>
            </thead>
            <tbody>
            {requestData.map((item) => (
              <tr className="border-b border-gray-200 cursor-pointer hover:bg-gray-100" onClick={() => navigate(`request/${item.id}`)}>
                <td className="truncate md:truncate px-6 py-4">{dateFormat(new Date(item.requestDate), true)}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{item.user.name}</td>
                <td className="truncate md:truncate px-6 py-4">{item.user.email}</td>
                <td className="px-6 py-4">{item.user.phoneNumber}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Popup>
    </>
  );
};

export default MyServiceRequestPopUp;