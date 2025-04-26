import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dateFormat } from '../../../utils/helperFunctions';

const OrderCard = ({ area }) => {
  const navigate = useNavigate();

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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      key={area.id}
      className="p-4 border rounded-md shadow-sm bg-white flex flex-col justify-between h-full cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={() => navigate('')}
    >
      {/* Topo */}
      <div>
        <p className="font-medium text-gray-800">Pedido</p>
        <p className="text-sm text-gray-600 mb-4">{truncateText(area.description, 60)}</p>
      </div>

      {/* Fundo */}
      <div className="mt-auto space-y-1">
        <p className="text-sm text-gray-600">
          <b>Urgência: </b>
          <span className={getUrgencyColor(area.urgency)}>{getUrgencyText(area.urgency)}</span>
        </p>

        <p className="text-sm text-gray-600">
          <b>Deadline: </b>
          {area.votingDeadline ? dateFormat(new Date(area.votingDeadline)) : 'N/A'}
        </p>

        <p className="text-sm text-gray-600">
          <b>Status: </b>
          <span className={getStatusColor(area.status)}>{getStatusText(area.status)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
