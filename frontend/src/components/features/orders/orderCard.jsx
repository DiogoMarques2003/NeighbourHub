import { dateFormat, truncateText } from '../../../utils/helperFunctions';
import ItemCard from '@common/ItemCard';

const OrderCard = ({ order }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'VOTING':
        return 'Em votação';
      case 'COMPLETED':
        return 'Concluído';
      case 'IN_PROGRESS':
        return 'Em progresso';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500';
      case 'CANCELLED':
        return 'text-red-500';
      case 'VOTING':
        return 'text-purple-500';
      case 'IN_PROGRESS':
        return 'text-blue-500';
      case 'COMPLETED':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'LOW':
        return 'Baixa';
      case 'MEDIUM':
        return 'Média';
      case 'HIGH':
        return 'Alta';
      default:
        return urgency;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'LOW':
        return 'text-green-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'HIGH':
        return 'text-red-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <ItemCard navigateTo={order.id}>
      {/* Topo */}
      <div>
        <p className="font-medium text-gray-800">Pedido</p>
        <p className="text-sm text-gray-600 mb-4">{truncateText(order.description, 60)}</p>
      </div>

      {/* Fundo */}
      <div className="mt-auto space-y-1">
        <p className="text-sm text-gray-600">
          <b>Urgência: </b>
          <span className={getUrgencyColor(order.urgency)}>{getUrgencyText(order.urgency)}</span>
        </p>

        <p className="text-sm text-gray-600">
          <b>Deadline: </b>
          {order.votingDeadline ? dateFormat(new Date(order.votingDeadline)) : 'N/A'}
        </p>

        <p className="text-sm text-gray-600">
          <b>Status: </b>
          <span className={getStatusColor(order.status)}>{getStatusText(order.status)}</span>
        </p>
      </div>
    </ItemCard>
  );
};

export default OrderCard;
