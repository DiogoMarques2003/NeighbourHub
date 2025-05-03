import { useEffect, useState } from 'react';
import commonAreaReservation from '@services/commonAreaReservation';
import { useOutletContext } from 'react-router-dom';
import List from '@common/List';
import Loading from '@common/Loading';

const AreaReservationsList = () => {
  const { currentUser, condominium, isAdmin } = useOutletContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);

      const query = {
        status: '',
        bGetCondominiumReservations: isAdmin,
        pageSize: 5,
        pageNumber,
      };

      const data = await commonAreaReservation.getReservations(condominium.id, query);
      setLoading(false);

      if (!data || data.error) return;

      setReservations((prev) => [...prev, ...data.data]);
      setHasMore(data.actualPage < data.pages);
    };

    fetchReservations();
  }, [pageNumber, condominium.id, isAdmin]);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#3e94bf] mb-6">
        {isAdmin ? 'Reservas do Condomínio' : 'Minhas Reservas de Espaço'}
      </h1>

      {loading && !reservations.length ? (
        <Loading />
      ) : (
        <List headers={headers} rows={formattedRows} className="max-h-[600px]" />
      )}
    </div>
  );
};

export default AreaReservationsList;
