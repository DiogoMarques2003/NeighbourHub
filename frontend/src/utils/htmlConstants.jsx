import { CircleCheck, Hammer, CircleX, Clock, Loader, Eye, CheckCircle, XCircle } from 'lucide-react';

const COMMON_AREA_STATUS_ICONS = {
  READY: (
    <span className="flex items-center">
      <CircleCheck color="green" className="mr-2 text-color-red" size={22} /> Disponível
    </span>
  ),
  MANUT: (
    <span className="flex items-center">
      <Hammer color="#ffd500" className="mr-2 text-color-red" size={22} /> Em manutenção
    </span>
  ),
  INACT: (
    <span className="flex items-center">
      <CircleX color="red" className="mr-2 text-color-red" size={22} /> Inativo
    </span>
  ),
};

const STATUS_ORDER_ICONS = {
  PENDING: <Clock size={22} />,
  IN_PROGRESS: <Loader size={22} />,
  REVIEW: <Eye size={22} />,
  COMPLETED: <CheckCircle size={22} />,
  CANCELLED: <XCircle size={22} />,
};

export { COMMON_AREA_STATUS_ICONS, STATUS_ORDER_ICONS };
