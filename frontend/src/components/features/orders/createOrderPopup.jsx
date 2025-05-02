import Popup from '@common/Popup';
import Button from '@common/Button';
import InputWithIcon from '@common/InputWithIcon';
import ErrorBar from '@common/ErrorBar';
import { AlarmCheck, Tags, Text } from 'lucide-react';
import { useState, useEffect } from 'react';
import ordersService from '@services/orders';
import { toast } from 'react-toastify';
import DropDown from '@common/DropDown';

const statusOptions = {
  PENDING: 'Pendente',
  VOTING: 'Em Votação',
  IN_PROGRESS: 'Em Progresso',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
};

const urgencyOptions = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
};

const getFilteredStatusOptions = (currentStatus) => {
  return Object.fromEntries(Object.entries(statusOptions).filter(([key]) => key === currentStatus || key !== 'VOTING'));
};

const EditOrderPopup = ({ openPopup, setOpenPopup, order, onOrderUpdated, isAdmin, currentUser }) => {
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setDescription(order.description || '');
      setUrgency(order.urgency || '');
      setStatus(order.status || '');
    }
  }, [order]);

  const isOwner = currentUser?.id === order?.user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedOrder = isAdmin ? { status } : isOwner ? { description, urgency } : {};

    const result = await ordersService.updateOrder(order.condominiumId, order.id, updatedOrder);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    toast.success('Pedido atualizado!');
    setOpenPopup(false);
    setIsLoading(false);
    onOrderUpdated();
  };

  return (
    <Popup
      openPopUp={openPopup}
      closePopUp={() => setOpenPopup(false)}
      popupTitle="Editar Pedido"
      popupHandleSubmit={handleSubmit}
    >
      {error && <ErrorBar error={error} />}

      {isOwner && (
        <>
          <InputWithIcon
            icon={Text}
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <DropDown
            listOptions={urgencyOptions}
            setChoice={setUrgency}
            choice={urgency}
            dropBoxPlaceHolder="Urgência"
            icon={AlarmCheck}
          />
        </>
      )}

      {isAdmin && (
        <DropDown
          listOptions={getFilteredStatusOptions(status)}
          setChoice={setStatus}
          choice={status}
          dropBoxPlaceHolder="Status"
          icon={Tags}
        />
      )}

      <Button type="submit" isLoading={isLoading} fullWidth>
        Guardar Alterações
      </Button>
    </Popup>
  );
};

export default EditOrderPopup;
