import { useEffect, useState } from 'react';
import commonAreaReservation from '@services/commonAreaReservation';
import { useOutletContext } from 'react-router-dom';
import List from '@common/List';
import Loading from '@common/Loading';
import ToggleSwitch from '@common/ToggleSwitch';
import DropDown from '@common/DropDown';
import Popup from '@common/Popup';
import { Tags } from 'lucide-react';
import { COMMON_AREA_RESERVATION_STATUS } from '@utils/constants';
import { formatDateToDateTimeLocalInput } from '@utils/helperFunctions';
import Input from '@common/Input';
import Button from '@common/Button';

const statusOptions = {
  '': 'Todos',
  ...COMMON_AREA_RESERVATION_STATUS,
};

const AreaReservationsList = () => {
  const { condominium, isAdmin } = useOutletContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [showFineFields, setShowFineFields] = useState(false);
  const [fineReason, setFineReason] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  const toISOStringFromLocal = (datetimeStr) => new Date(datetimeStr).toISOString();

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

  useEffect(() => {
    getReservations();
  }, [pageNumber, selectedStatus, showOnlyMine]);

  useEffect(() => {
    if (pageNumber !== 1) setPageNumber(1);
  }, [selectedStatus, showOnlyMine]);

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
    } else if (status === 'CANCELED') {
      statusColor = 'text-red-600 font-medium';
      statusIcon = '❌';
    } else if (status === 'COMPLETED' || status === 'APPROVED') {
      statusColor = 'text-green-600 font-medium';
      statusIcon = '✅';
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

  const handleRowClick = (rowIdx) => {
    const selected = reservations[rowIdx];
    if (!selected) return;
    setSelectedReservation(selected);
    setPopupOpen(true);
    setNewStatus(selected.status);
    setShowFineFields(false);
    setFineReason('');
    setFineAmount('');
    setNewStartDate(formatDateToDateTimeLocalInput(new Date(selected.startDate)));
    setNewEndDate(formatDateToDateTimeLocalInput(new Date(selected.endDate)));
  };

  const handleCreateFine = async () => {
    const parsedAmount = parseFloat(fineAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !fineReason.trim()) {
      alert('Preencha um valor válido e um motivo para a multa.');
      return;
    }

    const response = await commonAreaReservation.createFine({
      amount: parsedAmount,
      reason: fineReason,
      userId: selectedReservation.user.id,
      areaReservationId: selectedReservation.id,
      commonAreaId: selectedReservation.area.id,
      condominiumId: condominium.id,
    });

    if (response?.error) {
      alert(response.error);
    } else {
      alert('Multa criada com sucesso');
      setPopupOpen(false);
    }
  };

  const handleChangeStatus = async () => {
    if (!selectedReservation || !newStatus) return;

    const response = await commonAreaReservation.updateReservationStatus({
      condominiumId: condominium.id,
      commonAreaId: selectedReservation.area.id,
      reservationId: selectedReservation.id,
      status: newStatus,
    });

    if (response?.error) {
      alert(response.error);
    } else {
      alert('Status atualizado com sucesso');
      setPopupOpen(false);
      getReservations();
    }
  };

  const handleEmitFineClick = async () => {
    if (!selectedReservation) return;

    setShowFineFields(true);

    const response = await commonAreaReservation.getFineFromReservation({
      condominiumId: condominium.id,
      commonAreaId: selectedReservation.area.id,
      reservationId: selectedReservation.id,
    });

    if (response?.error) {
      setFineAmount('');
      setFineReason('');
    } else {
      setFineAmount(response.amount?.toString() || '');
      setFineReason(response.reason || '');
    }
  };

  const handleUpdateDates = async () => {
    if (!newStartDate || !newEndDate) {
      alert('Preencha ambas as datas.');
      return;
    }

    const response = await commonAreaReservation.updateReservationData({
      condominiumId: condominium.id,
      commonAreaId: selectedReservation.area.id,
      reservationId: selectedReservation.id,
      body: {
        startDate: newStartDate,
        endDate: newEndDate,
      },
    });

    if (response?.error) {
      alert(response.error);
    } else {
      alert('Datas atualizadas com sucesso');
      setPopupOpen(false);
      getReservations();
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#3e94bf]">
        {isAdmin ? 'Reservas do Condomínio' : 'Minhas Reservas de Espaço'}
      </h1>

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

      {loading && !reservations.length ? (
        <Loading />
      ) : fetchError ? (
        <p className="text-red-500">{fetchError}</p>
      ) : (
        <List
          headers={headers}
          rows={formattedRows}
          className="max-h-[600px]"
          renderRow={(row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-blue-100 transition cursor-pointer even:bg-blue-50 odd:bg-white"
              onClick={() => handleRowClick(rowIdx)}
            >
              {headers.map((header, colIdx) => (
                <td key={colIdx} className="p-3">
                  {row[header.key]}
                </td>
              ))}
            </tr>
          )}
        />
      )}

      {selectedReservation && (
        <Popup
          openPopUp={popupOpen}
          closePopUp={() => {
            setPopupOpen(false);
            setShowFineFields(false);
            setFineAmount('');
            setFineReason('');
          }}
          popupTitle={`Opções para reserva de ${selectedReservation.area?.name || 'Espaço'}`}
          popupHandleSubmit={(e) => e.preventDefault()}
        >
          {!isAdmin && (
            <div className="space-y-2">
              <label className="text-sm text-gray-700 block">Início da reserva:</label>
              <Input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 text-sm"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />

              <label className="text-sm text-gray-700 block">Fim da reserva:</label>
              <Input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 text-sm"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
              <Button onClick={handleUpdateDates} fullWidth variant="primary">
                Salvar alterações de data
              </Button>
            </div>
          )}

          {isAdmin && (
            <div className="space-y-4">
              <DropDown
                listOptions={COMMON_AREA_RESERVATION_STATUS}
                setChoice={setNewStatus}
                choice={newStatus}
                dropBoxPlaceHolder="Seleciona novo status"
                icon={Tags}
              />

              <Button onClick={handleChangeStatus} fullWidth variant="primary">
                Confirmar alteração de status
              </Button>

              {!showFineFields ? (
                <Button onClick={handleEmitFineClick} fullWidth variant="danger">
                  Emitir multa
                </Button>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Valor da multa (€)"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                  />
                  <textarea
                    placeholder="Motivo da multa"
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows={3}
                    value={fineReason}
                    onChange={(e) => setFineReason(e.target.value)}
                  />
                  <Button onClick={handleCreateFine} fullWidth variant="danger">
                    Salvar multa
                  </Button>
                </div>
              )}
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default AreaReservationsList;
