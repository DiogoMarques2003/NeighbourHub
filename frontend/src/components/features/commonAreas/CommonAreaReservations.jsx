import { useEffect, useState } from 'react';
import commonAreaReservation from '@services/commonAreaReservation';
import { useOutletContext } from 'react-router-dom';
import List from '@common/List';
import Loading from '@common/Loading';
import ToggleSwitch from '@common/ToggleSwitch';
import DropDown from '@common/DropDown';
import { Tags } from 'lucide-react';
import { COMMON_AREA_RESERVATION_STATUS } from '@utils/constants';

const statusOptions = {
  '': 'Todos',
  ...COMMON_AREA_RESERVATION_STATUS,
};;

const AreaReservationsList = () => {
  const { condominium, isAdmin } = useOutletContext();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filtros
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch principal
  const getReservations = async () => {
    setLoading(true);
    setFetchError('');

    const query = {
      status: selectedStatus,
      bGetCondominiumReservations: isAdmin && !showOnlyMine,
      pageSize: 5,
      pageNumber,
    };

    const data = await commonAreaReservation.getReservations(condominium.id, query);
    setLoading(false);

    if (!data || data.error) {
      setFetchError(data?.error || 'Erro ao buscar reservas');
      return;
    }

    if (pageNumber === 1) setReservations(data.data);
    else setReservations((prev) => [...prev, ...data.data]);

    setHasMore(data.actualPage < data.pages);
  };

  // Trigger fetch quando filtros ou página mudam
  useEffect(() => {
    getReservations();
  }, [pageNumber, selectedStatus, showOnlyMine]);

  // Reset página ao mudar filtros
  useEffect(() => {
    if (pageNumber !== 1) setPageNumber(1);
  }, [selectedStatus, showOnlyMine]);

  // Headers da tabela
  const headers = [
    { label: 'Espaço', key: 'areaName' },
    { label: 'Status', key: 'statusFormatted' },
    { label: 'Início', key: 'startDate' },
    { label: 'Fim', key: 'endDate' },
    ...(isAdmin ? [{ label: 'Utilizador', key: 'userInfo' }] : []),
  ];

  const formattedRows = reservations.map((res) => {
    const status = res.status;
    let statusColor = 'text-gray-600';
    let statusIcon = '⏳';

    if (status === 'PENDING') {
      statusColor = 'text-yellow-600 font-medium';
      statusIcon = '⏳';
    } else if (status === 'APPROVED') {
      statusColor = 'text-green-600 font-medium';
      statusIcon = '✅';
    } else if (status === 'REJECTED') {
      statusColor = 'text-red-600 font-medium';
      statusIcon = '❌';
    }

    return {
      ...res,
      areaName: res.area?.name || 'Espaço',
      startDate: res.startDate ? new Date(res.startDate).toLocaleString() : 'N/A',
      endDate: res.endDate ? new Date(res.endDate).toLocaleString() : 'N/A',
      statusFormatted: (
        <span className={statusColor}>
          {statusIcon} {status}
        </span>
      ),
      userInfo: isAdmin && res.user ? `${res.user.name} (${res.user.email})` : '',
    };
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#3e94bf]">
        {isAdmin ? 'Reservas do Condomínio' : 'Minhas Reservas de Espaço'}
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <DropDown
          listOptions={statusOptions}
          setChoice={(code) => setSelectedStatus(code)}
          choice={selectedStatus}
          dropBoxPlaceHolder="Filtrar por status"
          icon={Tags}
        />

        {isAdmin && (
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <ToggleSwitch checked={showOnlyMine} onChange={(checked) => setShowOnlyMine(checked)} />
            <span>Mostrar apenas as minhas reservas</span>
          </div>
        )}
      </div>

      {/* Lista */}
      {loading && !reservations.length ? (
        <Loading />
      ) : fetchError ? (
        <p className="text-red-500">{fetchError}</p>
      ) : (
        <List headers={headers} rows={formattedRows} className="max-h-[600px]" />
      )}
    </div>
  );
};

export default AreaReservationsList;
