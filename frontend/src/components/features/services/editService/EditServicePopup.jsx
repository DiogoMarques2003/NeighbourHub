import Button from '@common/Button';
import ErrorBar from '@common/ErrorBar';
import InputWithIcon from '@common/InputWithIcon';
import Popup from '@common/Popup';
import servicesService from '@services/servicesService';
import { Euro, Hammer, Text } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditServicePopup = ({ openPopup, setOpenPopup, service, onServiceUpdated }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  useEffect(() => {
    if (service) {
      setServiceName(service.name || '');
      setServiceDesc(service.description || '');
      setServicePrice(service.cost?.toString() || '');
    }
  }, [service]);

  const handleClose = () => {
    setServiceName('');
    setServiceDesc('');
    setServicePrice('');
    setError('');
    setOpenPopup(false);
  };

  const validateForm = () => {
    if (!serviceName.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!serviceDesc.trim()) {
      setError('Descrição é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const updatedService = {
      name: serviceName,
      description: serviceDesc,
      cost: servicePrice ? Number(servicePrice) : 0,
    };

    const result = await servicesService.updateService(service.condId, service.id, updatedService);

    if (result?.error || !result) {
      setError(result?.error || 'Erro ao atualizar serviço');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    handleClose();
    onServiceUpdated();
    toast.success(result?.message || 'Serviço atualizado com sucesso!');
  };

  return (
    <Popup
      openPopUp={openPopup}
      closePopUp={handleClose}
      popupTitle={'Editar Serviço'}
      popupHandleSubmit={handleSubmit}
    >
      {error && <ErrorBar error={error} />}

      <InputWithIcon
        icon={Hammer}
        type="text"
        name="name"
        placeholder="Nome do serviço"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />

      <InputWithIcon
        icon={Text}
        type="text"
        name="desc"
        placeholder="Descrição"
        value={serviceDesc}
        onChange={(e) => setServiceDesc(e.target.value)}
      />

      <InputWithIcon
        icon={Euro}
        type="text"
        name="cost"
        placeholder="Preço"
        value={servicePrice}
        onChange={(e) => setServicePrice(e.target.value)}
      />

      <div className="mt-6">
        <Button type="submit" isLoading={isLoading} fullWidth>
          Guardar alterações
        </Button>
      </div>
    </Popup>
  );
};

export default EditServicePopup;
