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

export { getUrgencyColor, getStatusText, getUrgencyText };
