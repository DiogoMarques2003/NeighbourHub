import { useState } from 'react';
import { Mail, Building, Phone } from 'lucide-react';
import InputWithIcon from '../../common/InputWithIcon';
import Button from '../../common/Button';

const CreateCondominiumForm = () => {
  const [condName, setCondName] = useState('');
  const [condEmail, setCondEmail] = useState('');
  const [condPhone, setCondPhone] = useState('');
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
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
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
