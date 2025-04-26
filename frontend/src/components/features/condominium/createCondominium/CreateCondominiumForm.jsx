import { useState } from 'react';
import { Mail, Building, Phone, Euro } from 'lucide-react';
import InputWithIcon from '@common/InputWithIcon';
import Button from '@common/Button';
import ErrorBar from '@common/ErrorBar';
import { toast } from 'react-toastify';
import condominiumService from '@services/condominiumService';
import { useNavigate } from 'react-router-dom';

const CreateCondominiumForm = () => {
  const navigate = useNavigate();
  const [condName, setCondName] = useState('');
  const [condEmail, setCondEmail] = useState('');
  const [condPhone, setCondPhone] = useState('');
  const [condQuota, setcondQuota] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!condName.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!condEmail.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (!condPhone.trim()) {
      setError('Número de telemóvel é obrigatório');
      return false;
    }
    if (!condQuota.trim()) {
      setError('Cota mensal é obrigatória');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const condData = { 
      name: condName,
      email: condEmail,
      phoneNumber: condPhone,
      monthlyQuota: Number(condQuota)              
    }

    const result = await condominiumService.postCreateCondominium(condData)

    if (result?.error || !result) {
      setError(result?.error || 'Não foi possivel criar condominio');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success(result?.message || 'Condominio criado!');
    navigate("/condominium");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <ErrorBar error={error}/>}
        <div className="space-y-4">
          <InputWithIcon
            icon={Building}
            type="text"
            name="name"
            placeholder="Nome do Condominio"
            value={condName}
            onChange={(e) => setCondName(e.target.value)}
          />
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={condEmail}
            onChange={(e) => setCondEmail(e.target.value)}
          />
          <InputWithIcon
            icon={Phone}
            name="phoneNumber"
            type="tel"
            placeholder="Numero de telefone"
            value={condPhone}
            onChange={(e) => setCondPhone(e.target.value)}
            required
            maxLength={9}
          />
          <InputWithIcon
            icon={Euro}
            name="monQuota"
            type="number"
            placeholder="Cota mensal"
            value={condQuota}
            onChange={(e) => setcondQuota(e.target.value)}
            required
            maxLength={6}
          />
          <div className="mt-6">
            <Button type="submit" isLoading={isLoading} fullWidth>
              Registar novo condominio
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCondominiumForm;
