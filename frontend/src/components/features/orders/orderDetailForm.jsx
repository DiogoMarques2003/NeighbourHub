import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import ordersService from '@services/orders';
import { dateFormat } from '@utils/helperFunctions';
import defaultAvatar from '@public/images/defaultUserAvatar.jpg';
import { Plus } from 'lucide-react';
import { getStatusText, getUrgencyColor, getUrgencyText, getStatusColor } from './orderConsts';
import EditOrderPopup from './createOrderPopup';
import VoteCard from '@features/vote/voteCard';
import votesService from '@services/votes';

const OrderDetailsForm = () => {
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useOutletContext();
  const { condominiumId, orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);

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

  if (loading) return <p className="p-8 text-gray-500">A carregar...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!order) return null;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800" style={{ color: '#3e94bf' }}>
          Detalhes do Pedido
        </h1>
        {(isAdmin || currentUser.id === order.user.id) && (
          <button
            onClick={() => setEditPopupOpen(true)}
            className="bg-[#3e94bf] hover:bg-[#31789c] text-white px-4 py-2 rounded text-sm"
          >
            Editar Pedido
          </button>
        )}
      </div>
      <div className="flex gap-10">
        {/* Caixa da Esquerda */}
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Descrição
          </h2>
          <div className="text-gray-700 mb-2">{order.description}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Urgência
          </h2>
          <div className={`mb-2 ${getUrgencyColor(order.urgency)}`}>{getUrgencyText(order.urgency)}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
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

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Orçamento aceite
          </h2>
          {order.status === 'COMPLETED' ? (
            <div className="text-gray-700 mb-2">Falta ir buscar o orçamento</div>
          ) : (
            <div className="text-gray-700 mb-2">A votação ainda não terminou</div>
          )}
        </div>

        {/* Caixa da Direita */}
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Status
          </h2>
          <div className={`mb-2 ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Data do Pedido
          </h2>
          <div className="text-gray-700 mb-2">{order.createdAt ? dateFormat(new Date(order.createdAt)) : 'N/A'}</div>

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
      <EditOrderPopup
        openPopup={editPopupOpen}
        setOpenPopup={setEditPopupOpen}
        order={{ ...order, condominiumId }}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onOrderUpdated={() => window.location.reload()}
      />
    </div>
  );
};

export default OrderDetailsForm;
