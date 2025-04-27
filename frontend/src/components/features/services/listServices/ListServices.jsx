import Title from '@common/Title';
import TitleWithAddButton from '@common/TitleWithAddButton';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CreateServicePopup from '../createService/CreateServicePopup';
import InputWithIcon from '@common/InputWithIcon';
import { Eye, EyeOff, Star } from 'lucide-react';
import CheckBox from '@common/CheckBox';
import Button from '@common/Button';
import ListServiceFiltersCard from './ListServiceFiltersCard';
import servicesService from '@services/servicesService';

const ListServices = () => {
  const { condominium } = useOutletContext();

  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [filterError, setFilterError] = useState('');

  const [services, setServices] = useState([]);
  const [minReviews, setMinReviews] = useState(0);
  const [maxReviews, setMaxReviews] = useState(5);
  const [myServices, setMyServices] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função para obter os serviços
  async function getServices() {
    setIsLoading(true);

    const queryString = {
      pageNumber,
      pageSize: 3,
      minReviews,
      maxReviews,
      myServices,
    };

    const result = await servicesService.getServices(condominium.id, queryString);
    setIsLoading(false);

    if (!result || result.error) {
      if (services.length === 0) {
        setFetchError(result?.error || 'Não foi possível obter serviços com os filtros aplicados');
      }
      return;
    }

    setFetchError('');

    setServices((prev) => [...prev, ...result.data]);
    setHasMore(result.actualPage < result.pages);

    console.log(services);
  }

  // Obter os serviços quando a página carregar ou quando o número da página mudar
  useEffect(() => {
    getServices();
  }, [condominium.id, pageNumber]);

  // Validar filtros e caso sejám validos, resetar serviços e página
  useEffect(() => {
    if (minReviews < 0 || minReviews > 5) {
      setFilterError('A nota mínima deve ser entre 0 e 5');
      return;
    }

    if (maxReviews < 0 || maxReviews > 5) {
      setFilterError('A nota máxima deve ser entre 0 e 5');
      return;
    }

    if (minReviews > maxReviews) {
      setFilterError('A nota mínima não pode ser maior que a máxima');
      return;
    }

    setFilterError('');
    setServices([]);
    setHasMore(true);
    if (pageNumber !== 1) setPageNumber(1);
    else getServices();
  }, [myServices, minReviews, maxReviews]);

  return (
    <>
      {/* Titulo da página para se for morador ou não */}
      {condominium.isResident ? (
        <TitleWithAddButton title="Serviços" onAddClick={() => condominium.isResident && setOpenPopup(true)} />
      ) : (
        <Title title="Serviços" />
      )}

      {/* Popup para criar o serviço */}
      <CreateServicePopup openPopup={openPopup} setOpenPopup={setOpenPopup} />

      {/* Filtros */}
      <ListServiceFiltersCard
        maxReviews={maxReviews}
        minReviews={minReviews}
        myServices={myServices}
        filterError={filterError}
        setMaxReviews={setMaxReviews}
        setMinReviews={setMinReviews}
        setMyServices={setMyServices}
      />

      {/* Lista com os serviços */}
    </>
  );
};

export default ListServices;
