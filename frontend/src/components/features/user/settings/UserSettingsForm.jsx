import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@hooks/useAuthContext';
import { useState } from 'react';
import EditPhoto from '@common/Edithoto';
import ErrorBar from '@common/ErrorBar';
import { CreditCard, Phone, User, Lock } from 'lucide-react';
import InputWithIcon from '@common/InputWithIcon';
import InputMaskWithIcon from '@common/InputMaskWithIcon';
import Button from '@common/Button';
import authService from '@services/authService';
import { toast } from 'react-toastify';

const UserSettingsForm = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser, logout } = useAuthContext();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(currentUser?.foto);
  const [name, setName] = useState(currentUser.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [iban, setIban] = useState(currentUser.iban);

  const validateForm = () => {
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }

    if (!phoneNumber.trim()) {
      setError('Número de telemóvel é obrigatório');
      return false;
    }

    if (!iban.trim()) {
      setError('Iban é obrigatório');
      return false;
    }

    if (password && password !== confirmPassword) {
      setError('As passwords não correspondem');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const formData = new FormData();
    if (name !== currentUser.name) formData.append('name', name);
    if (phoneNumber !== currentUser.phoneNumber) formData.append('phoneNumber', phoneNumber);
    if (iban !== currentUser.iban) formData.append('iban', iban);
    if (password) formData.append('password', password);

    if (!profileImage && currentUser.foto) {
      formData.append('deleteFoto', true);
    } else if (profileImage && profileImage !== currentUser.foto) {
      formData.append('foto', profileImage);
    }

    const result = await authService.editUser(formData);
    if (!result || result?.error) {
      setError(result?.error || 'Erro ao atualizar o perfil');
      setIsLoading(false);
      return;
    }

    updateCurrentUser(result.user);
    setIsLoading(false);

    if (password) {
      toast.success('Volte a iniciar sessão');
      logout();
      navigate('/login');
      return;
    }

    toast.success(result?.message || 'Perfil atualizado com sucesso!');
    navigate(-1);
  };

  const onImageChange = (file) => {
    setProfileImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <EditPhoto onImageChange={onImageChange} type="circular_large" previewUrlImage={profileImage} showRemove />

      <ErrorBar error={error} />

      <div className="space-y-4 mt-6">
        <InputWithIcon
          icon={User}
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <InputWithIcon
          icon={Phone}
          name="phoneNumber"
          type="tel"
          placeholder="Numero de telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          maxLength={9}
        />

        <InputMaskWithIcon
          icon={CreditCard}
          name="iban"
          placeholder="Iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
          mask="PT50 9999 9999 99999999999 99"
        />

        <div className="relative">
          <InputWithIcon
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="relative">
          <InputWithIcon
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={!!password}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" isLoading={isLoading} fullWidth>
          Atualizar Perfil
        </Button>
      </div>
    </form>
  );
};

export default UserSettingsForm;
