import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import condominiumService from '@services/condominiumService';
import Popup from '@common/Popup';

const SettingsCondominiumForm = () => {
  const { condominiumId } = useParams();
  const navigate = useNavigate();

  const { condominium, isAdmin } = useOutletContext();

  // const [condominium, setCondominium] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  }, [condominiumId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFields = () => {
    if (condominium) {
      setFormData({
        name: condominium.name || '',
        email: condominium.email || '',
        phoneNumber: condominium.phoneNumber || '',
        monthlyQuota: Number(condominium.monthlyQuota),
      });
      toast.info('Campos revertidos para os dados originais.');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    const cleanedData = {
      ...formData,
    };

    if (!cleanedData.monthlyQuota) delete cleanedData.monthlyQuota;

    const result = await condominiumService.editCondominium(condominiumId, cleanedData);

    if (result?.error || !result) {
      toast.error(result?.error || 'Erro ao editar condomínio.');
      setIsLoading(false);
      return;
    }

    toast.success('Condomínio atualizado com sucesso!');
    setIsLoading(false);
    navigate(`/condominium/${condominiumId}`);
  };

  const handleDeleteConfirmed = async () => {
    setIsLoading(true);
    const result = await condominiumService.deleteCondominium(condominiumId);

    if (result?.error || !result) {
      toast.error(result?.error || 'Erro ao eliminar condomínio.');
      setIsLoading(false);
      return;
    }

    toast.success('Condomínio eliminado com sucesso!');
    setIsLoading(false);
    navigate('/condominium');
  };

  if (!condominium) return <p className="p-8 text-gray-500">A carregar dados...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#3e94bf] mb-8">Definições do Condomínio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do Condomínio"
          className="border p-3 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email do Condomínio"
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Número de Telefone"
          className="border p-3 rounded-md"
        />
        <input
          type="number"
          name="monthlyQuota"
          value={formData.monthlyQuota}
          onChange={handleChange}
          placeholder="Quota Mensal (€)"
          className="border p-3 rounded-md"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? 'A guardar...' : 'Salvar Edições'}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Eliminar Condomínio
        </button>

        <button
          onClick={handleResetFields}
          className="flex items-center justify-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
        >
          Limpar Tudo
        </button>
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
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default SettingsCondominiumForm;
