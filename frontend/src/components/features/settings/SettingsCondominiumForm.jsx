import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import condominiumService from '@services/condominiumService';
import Popup from '@common/Popup';
import InputWithIcon from '@common/InputWithIcon';
import { Building, Euro, Mail, Phone } from 'lucide-react';
import { handleFormDataChange } from '@utils/helperFunctions';
import Button from '@common/Button';

const SettingsCondominiumForm = () => {
  const navigate = useNavigate();
  const { condominiumId } = useParams();
  const { condominium, isAdmin, setCondominium } = useOutletContext();

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    monthlyQuota: '',
  });

  useEffect(() => {
    if (!isAdmin || condominiumId !== condominium?.id) {
      toast.error('Não tens permissão para aceder a esta página.');
      navigate(-1);
    }

    setFormData({ ...condominium });
  }, [condominiumId]);

  const handleResetFields = () => {
    setFormData({ ...condominium });
    toast.info('Campos revertidos para os dados originais.');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Email é obrigatório');
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error('Número de telemóvel é obrigatório');
      return false;
    }

    if (!formData.monthlyQuota) {
      toast.error('Cota mensal é obrigatória');
      return false;
    }

    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoadingUpdate(true);

    const cleanedData = {
      ...formData,
      monthlyQuota: Number(formData.monthlyQuota),
    };

    const result = await condominiumService.editCondominium(condominiumId, cleanedData);

    if (result?.error || !result) {
      toast.error(result?.error || 'Erro ao editar condomínio.');
      setIsLoadingUpdate(false);
      return;
    }

    setCondominium(result.condominium);
    toast.success(result.message || 'Condomínio atualizado com sucesso!');
    setIsLoadingUpdate(false);
    navigate(-1);
  };

  const handleDeleteConfirmed = async () => {
    setIsLoadingDelete(true);
    const result = await condominiumService.deleteCondominium(condominiumId);

    if (result?.error || !result) {
      toast.error(result?.error || 'Erro ao eliminar condomínio.');
      setIsLoadingDelete(false);
      return;
    }

    toast.success('Condomínio eliminado com sucesso!');
    setIsLoadingDelete(false);
    navigate('/condominium');
  };

  return (
    <form className="p-10" onSubmit={handleSave}>
      <h1 className="text-3xl font-bold text-[#3e94bf] mb-8">Definições do Condomínio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InputWithIcon
          icon={Building}
          type="text"
          name="name"
          placeholder="Nome do Condomínio"
          value={formData.name}
          onChange={(e) => handleFormDataChange(e, setFormData)}
          required
        />

        <InputWithIcon
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email do Condomínio"
          value={formData.email}
          onChange={(e) => handleFormDataChange(e, setFormData)}
          required
        />

        <InputWithIcon
          icon={Phone}
          name="phoneNumber"
          type="tel"
          placeholder="Numero de telefone do Condomínio"
          value={formData.phoneNumber}
          onChange={(e) => handleFormDataChange(e, setFormData)}
          maxLength={9}
          required
        />

        <InputWithIcon
          icon={Euro}
          name="monthlyQuota"
          type="number"
          placeholder="Cota mensal"
          value={formData.monthlyQuota}
          onChange={(e) => handleFormDataChange(e, setFormData)}
          maxLength={6}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
        <Button type="submit" isLoading={isLoadingUpdate}>
          Salvar Edições
        </Button>

        <Button onClick={() => setIsModalOpen(true)} variant="danger">
          Eliminar Condomínio
        </Button>

        <Button onClick={handleResetFields} variant="secondary">
          Limpar Tudo
        </Button>
      </div>

      {isModalOpen && (
        <Popup openPopUp={isModalOpen} closePopUp={() => setIsModalOpen(false)} popupTitle="Eliminar Condomínio">
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Tens a certeza que queres eliminar o condomínio <strong>{condominium.name}</strong>?
              <br />
              Esta ação <span className="font-bold">não pode ser desfeita</span>.
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>

              <Button variant="danger" onClick={handleDeleteConfirmed} isLoading={isLoadingDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </form>
  );
};

export default SettingsCondominiumForm;
