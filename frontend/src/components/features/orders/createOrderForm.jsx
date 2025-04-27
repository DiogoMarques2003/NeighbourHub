import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorBar from '@common/ErrorBar';
import { ORDER_URGENCY_TYPES } from '../../../utils/constants.js';
import ordersService from '@services/orders';
import { AlarmCheck, MapPin, MessageSquareText } from 'lucide-react';
import DropDown from '@common/DropDown';
import { handleFormDataChange } from '@utils/helperFunctions.js';
import TextAreaWithIcon from '@common/TextAreaWithIcon';
import Button from '../../common/Button.jsx';

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    urgency: '',
    lastOrder: '',
  });

  const { condominiumId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.description.trim()) {
      setError('Descrição é obrigatório!');
      return false;
    }
    if (!formData.urgency.trim()) {
      setError('Urgência é obrigatória!');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const response = await ordersService.createOrder(condominiumId, formData);
    if (!response || response?.error) {
      setError(response?.error || 'Falha a criar pedido');
      setIsLoading(false);
      return;
    }

    navigate(-1);
    toast.success(response?.message || 'Pedido criado com sucesso');
    setIsLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <ErrorBar error={error} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-4">
          <TextAreaWithIcon
            icon={MessageSquareText}
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => handleFormDataChange(e, setFormData)}
          />

          <DropDown
            listOptions={ORDER_URGENCY_TYPES}
            setChoice={(e) => handleFormDataChange(e, setFormData, 'urgency')}
            choice={formData.urgency}
            dropBoxPlaceHolder="Urgência"
            icon={AlarmCheck}
          />
        </div>
      </div>

      <div className="fixed bottom-8 right-10">
        <Button type="submit" isLoading={isLoading} fullWidth>
          Criar Pedido
        </Button>
      </div>
    </form>
  );
};

export default CreateOrderForm;
