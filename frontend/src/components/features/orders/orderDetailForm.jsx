import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import ordersService from '@services/orders';
import { dateFormat } from '@utils/helperFunctions';
import defaultAvatar from '@public/images/defaultUserAvatar.jpg';
import { AlarmClock, Plus, Tags } from 'lucide-react';
import { getStatusText, getUrgencyColor, getUrgencyText, getStatusColor } from './orderConsts';
import EditOrderPopup from './createOrderPopup';
import VoteCard from '@features/vote/voteCard';
import votesService from '@services/votes';
import GoBack from '@common/GoBack';
import Button from '@common/Button';
import OrderProgressForm from './orderProgressForm';
import Loading from '@common/Loading';
import ErrorBar from '@common/ErrorBar';
import { ORDER_STATUS, ORDER_WORK_STATUS } from '@utils/constants';
import DropDown from '@common/DropDown.jsx';
import CheckBox from '@common/CheckBox.jsx';

const OrderDetailsForm = () => {
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useOutletContext();
  const { condominiumId, orderId } = useParams();
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);

  const [voteData, setVoteData] = useState({
    id: '',
    deadline: '',
    upVote: '',
    downVote: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await ordersService.getOrderById(condominiumId, orderId);
      const vote = await votesService.getVote(condominiumId, orderId);

      setVoteData({
        id: vote.id,
        deadline: vote.votingDeadline,
        upVote: vote.upVotes,
        downVote: vote.downVotes,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        dateFormat(new Date(result.createdAt));
        setOrder(result);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [condominiumId, orderId]);

  if (loading) {
    return (
      <div class="items-center flex justify-center h-full w-full">
        <Loading />
      </div>
    );
  }
  if (error) return <ErrorBar error={error} />;
  if (!order) return null;

  return (
    <>
      <div className="flex justify-between">
        <GoBack></GoBack>
        {(isAdmin || currentUser.id === order.user.id) && (
          <div className="flex gap-4">
            <Button onClick={() => setEditPopupOpen(true)}>Editar Pedido</Button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800" style={{ color: '#3e94bf' }}>
          Pedido: {order.title}
        </h1>
      </div>
      <div className="flex gap-10 mb-5">
        {/* Caixa da Esquerda */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#3e94bf' }}>
            Descrição
          </h2>
          <div className="text-gray-700 mb-4">{order.description}</div>

          <h2 className="text-xl font-semibold mb-2" style={{ color: '#3e94bf' }}>
            Urgência
          </h2>
          <div className={`mb-4 ${getUrgencyColor(order.urgency)}`}>{getUrgencyText(order.urgency)}</div>

          <h2 className="text-xl font-semibold mb-2" style={{ color: '#3e94bf' }}>
            Requisitante
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={order.user.foto || defaultAvatar}
              alt="Foto de perfil"
              className="w-16 h-16 object-cover rounded-full border"
            />
            <div className="text-gray-700 mb-2">
              <b>Nome:</b> {order.user.name} <p />
              <b>Email:</b> {order.user.email} <p />
              <b>Nº Telemóvel:</b> {order.user.phoneNumber}
            </div>
          </div>
        </div>

        {/* Caixa da Direita */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#3e94bf' }}>
            Status
          </h2>
          <div className={`mb-4 ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</div>

          <h2 className="text-xl font-semibold mb-2" style={{ color: '#3e94bf' }}>
            Data do Pedido
          </h2>
          <div className="text-gray-700 mb-4">{order.createdAt ? dateFormat(new Date(order.createdAt)) : 'N/A'}</div>

          {order.status === 'PENDING' && isAdmin && (
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ color: '#3e94bf' }}>
                Criar Votação
              </h2>
              <button
                className="text-xl font-semibold flex items-center cursor-pointer"
                style={{ color: '#3e94bf' }}
                onClick={() => navigate('./createVote')}
                type="button"
              >
                <Plus size={30} />
              </button>
            </div>
          )}

          {order.votingDeadline && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
                Votar
              </h2>
              <div className="max-w-xs w-full">
                <VoteCard vote={voteData} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Atualizações */}
      {(order.status !== ORDER_STATUS.PENDING && order.status !== ORDER_STATUS.VOTING) && (
        <>
          <div className="flex items-center">
            <h2 className="text-xl font-semibold mr-2" style={{ color: '#3e94bf' }}>
              Atualizações
            </h2>
            {isAdmin && (
              <button className="cursor-pointer font-app-color" type="button" onClick={() => setUpdatePopUp(true)}>
                <Plus />
                <span className="sr-only">Add</span>
              </button>
            )}
          </div>

          <div className="mt-3">
            <OrderProgressForm openPopup={updatePopUp} setOpenPopup={setUpdatePopUp} />
          </div>
        </>
      )}
      <EditOrderPopup
        openPopup={editPopupOpen}
        setOpenPopup={setEditPopupOpen}
        order={{ ...order, condominiumId }}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onOrderUpdated={() => window.location.reload()}
      />
    </>
  );
};

export default OrderDetailsForm;
