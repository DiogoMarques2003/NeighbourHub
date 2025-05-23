import { dateFormat, truncateText } from '../../../utils/helperFunctions';
import ItemCard from '@common/ItemCard';
import { getStatusText, getUrgencyColor, getUrgencyText, getStatusColor } from './orderConsts';

const OrderCard = ({ order }) => {
  return (
    <ItemCard navigateTo={order.id}>
      {/* Topo */}
      <div>
        <p className="font-medium text-gray-800">{order.title}</p>
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
