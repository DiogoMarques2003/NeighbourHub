import { useEffect, useState } from 'react';
import commonAreaReservation from '@services/commonAreaReservation';
import { useOutletContext } from 'react-router-dom';
import ScrollableList from '@common/ScrollableList';
import Loading from '@common/Loading';

const AreaReservationsList = () => {
  const { currentUser, condominium } = useOutletContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const data = await commonAreaReservation.getReservations(condominium.id, {
        // status: ,
        bGetCondominiumReservations: false,
        pageSize: 5,
        pageNumber,
      });

      setLoading(false);
      if (!data || data.error) return;

      setReservations((prev) => [...prev, ...data.data]);
      setHasMore(data.actualPage < data.pages);
    };

    fetchReservations();
  }, [pageNumber, currentUser.id, condominium.id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#3e94bf] mb-6">Minhas Reservas de Espaço</h1>

      {loading && !reservations.length ? (
        <Loading />
      ) : reservations.length === 0 ? (
        <p className="text-gray-500">Ainda não tens reservas registadas.</p>
      ) : (
        <ScrollableList
          items={reservations}
          renderItem={(res) => (
            <div key={res.id} className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-[#3e94bf] mb-1">{res.areaName}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {res.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Data:</strong> {res.date ? new Date(res.date).toLocaleDateString() : 'N/A'} às{' '}
                {res.time || 'N/A'}
              </p>
            </div>
          )}
          setPageNumber={setPageNumber}
          hasMore={hasMore}
        />
      )}
    </div>
  );
};

export default AreaReservationsList;
