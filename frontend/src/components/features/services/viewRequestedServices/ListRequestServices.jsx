import ErrorBar from '@common/ErrorBar';
import Loading from '@common/Loading';
import ScrollableList from '@common/ScrollableList';
import requestedServicesService from '@services/requestedServices';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ServiceCard from '../listServices/ServiceCard';

const ListRequestedServices = () => {
  const { condominium, currentUser } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [services, setServices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchError, setFetchError] = useState('');

  async function get_requests() {
    setIsLoading(true);
    const result = await requestedServicesService.getRequestedServices(condominium.id, {
      userID: currentUser.id,
      pageNumber,
      pageSize: 5,
    });
    console.log(result);
    setIsLoading(false);

    if (!result || result.error) {
      setFetchError(result?.error || 'Não foi possível obter serviços');
    }

    setFetchError('');

    if (pageNumber === 1) setServices(result.data);
    else setServices((prev) => [...prev, ...result.data]);
    setHasMore(result.actualPage < result.Pages);
  }

  useEffect(() => {
    get_requests();
  }, [pageNumber]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: '#3e94bf' }}>
        Serviços requisitados
      </h1>
      {isLoading && services.length === 0 ? (
        <Loading />
      ) : fetchError ? (
        <ErrorBar error={fetchError} />
      ) : (
        <ScrollableList
          items={services}
          hasMore={hasMore}
          setPageNumber={setPageNumber}
          renderItem={(service) => <ServiceCard key={service.id} service={service.service} />}
        />
      )}
    </>
  );
};

export default ListRequestedServices;
