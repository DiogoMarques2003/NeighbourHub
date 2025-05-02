const API_URL = 'https://neighbourhub.diogomarques.dev/api';

const CHOOSE_COND_ROLE = [
  { description: 'Morador', code: false },
  { description: 'Administrador', code: true },
];

const COMMON_AREA_TYPES = {
  1: 'Lazer',
  2: 'Fitness',
};

const COMMON_AREA_STATUS = {
  READY: 'Disponível',
  MANUT: 'Em Manutenção',
  UNAVAIL: 'Inativo',
};

const ORDER_URGENCY_TYPES = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
};

const HOUSE_TYPE_TYPES = {
  1: 'Moradia',
  2: 'Apartamento',
  3: 'Garagem',
  4: 'Outro',
  5: 'Prédio',
};

const REQUEST_SERVICE_STATATUS = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
};

export { API_URL, CHOOSE_COND_ROLE, COMMON_AREA_TYPES, HOUSE_TYPE_TYPES, ORDER_URGENCY_TYPES, REQUEST_SERVICE_STATATUS, COMMON_AREA_STATUS };
