import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import servicesService from '../services/servicesService';
import Button from '../components/common/Button';

const ServiceDetailsPage = () => {
  const { condominiumId, serviceId } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const result = await servicesService.getServiceById(condominiumId, serviceId);

      if (result?.error) {
        setError(result.error);
      } else {
        setService(result);
      }

      setLoading(false);
    };

    fetchService();
  }, [condominiumId, serviceId]);

  if (loading) return <p className="p-8 text-gray-500">A carregar...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!service) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Detalhes do Serviço</h1>

      {/* Nome + Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={service.avatar || '/default-avatar.png'}
          alt="Prestador"
          className="w-16 h-16 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-900">{service.name || 'Nome do serviço'}</h2>
      </div>

      {/* Descrição + Custo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-blue-800 mb-1">Descrição do serviço</h3>
          <p className="text-gray-700">{service.description || 'Descrição do serviço vai aqui...'}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-blue-800 mb-1">Custo do serviço</h3>
          <p className="text-gray-700">{service.cost || '0,00'}</p>
        </div>
      </div>

      {/* Alerta */}
      {service.warning && (
        <div className="flex items-center gap-2 text-yellow-800 bg-yellow-100 border border-yellow-300 p-3 rounded-md mb-6">
          <span className="text-xl">⚠️</span>
          <p className="font-semibold">Atenção!</p>
          <span className="ml-1">{service.warning}</span>
        </div>
      )}

      {/* Avaliação */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Avaliação</h3>
        <div className="flex text-yellow-400 text-xl gap-1 mb-4">
          {/* Estrelas fixas (podes depois substituir com cálculo real) */}
          {'★★★★★'}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(service.reviews && service.reviews.length > 0 ? service.reviews : [
            { user: 'User1', text: 'Serviço excelente!' },
            { user: 'User2', text: 'Atendeu rápido e resolveu o problema.' },
            { user: 'User3', text: 'Ótimo profissional, recomendo.' },
            { user: 'User4', text: 'Simples e eficaz.' }
          ]).map((review, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm bg-white">
              <p className="text-gray-800 font-medium">{review.user}</p>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botão final */}
      <div className="mt-8">
        <Button label="Requisitar Serviço" onClick={() => alert('Requisição enviada!')} />
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
