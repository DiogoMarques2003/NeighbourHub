import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import servicesService from '@services/servicesService';
import apiClient from '@services/apiClient';
import Button from '@common/Button';
import defaultUserPhoto from '@public/images/defaultUserAvatar.jpg';
import CircleLogo from '@common/CircleLogo';
import { Euro } from 'lucide-react';
import RatingStars from '@common/RatingStars';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import requestService from '@services/requestService';
import GoBack from '@common/GoBack.jsx';
import ErrorBar from '@common/ErrorBar.jsx';
import Loading from '@common/Loading.jsx';
import MyServiceRequestPopUp from '@features/services/viewMyServiceRequests/MyServiceRequestPopUp.jsx';
import EditServicePopup from '../editService/EditServicePopup';

const ServiceDetailsForm = () => {
  const { condominiumId, serviceId } = useParams();
  const { currentUser, condominium } = useOutletContext();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openPopup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleRequestService = async () => {
    setIsLoading(true);

    const result = await requestService.postRequestService(condominiumId, serviceId);

    if (result?.error || !result) {
      toast.error(result?.error || 'Não foi possível requisitar o serviço.');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success(result?.message || 'Serviço requisitado com sucesso!');
    navigate(`/condominium/${condominiumId}/services`);
  };

  useEffect(() => {
    const fetchService = async () => {
      const result = await servicesService.getServiceById(condominiumId, serviceId);

      if (result?.error) {
        setError(result.error);
      } else {
        setService(result);
        setSelectedService(result);
      }

      setLoading(false);
    };

    fetchService();
  }, [condominiumId, serviceId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/condominium/${condominiumId}/services/${serviceId}/reviews`, {
          params: {
            sortBy: 'rating',
            sortOrder: 'desc',
            pageNumber: page,
            pageSize: 4,
          },
        });
        setReviews(response.data.data);
        setTotalPages(response.data.pages);
      } catch (err) {
        console.error('Erro ao buscar reviews:', err);
      }
    };

    fetchReviews();
  }, [condominiumId, serviceId, page]);

  if (loading) return <Loading />;
  if (error) return <ErrorBar error={error}></ErrorBar>;
  if (!service) return null;

  return (
    <>
      {openPopup && (
        <>
          {' '}
          <MyServiceRequestPopUp openPopup={openPopup} setPopup={setPopup} class />{' '}
        </>
      )}
      <div className="flex justify-between">
        <GoBack></GoBack>
        {service.owner.id === currentUser.id && (
          <div className="flex gap-4">
            <Button onClick={() => setPopup(true)}>Ver Requisições</Button>
            <Button onClick={() => setEditPopupOpen(true)}>
              Editar Serviço
            </Button>
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: '#3e94bf' }}>
        Detalhes do Serviço
      </h1>

      {/* Nome + Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <CircleLogo src={service.owner.foto || defaultUserPhoto} size="em" />
        <h2 className="text-xl font-semibold text-gray-900">{service.owner.name || 'Nome do serviço'}</h2>
      </div>

      <div className="pb-4">
        <h3 className="text-lg font-medium mb-1" style={{ color: '#3e94bf' }}>
          Serviço
        </h3>
        <p className="text-gray-700">{service.name}</p>
      </div>

      {/* Descrição + Custo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-1" style={{ color: '#3e94bf' }}>
            Descrição do serviço
          </h3>
          <p className="text-gray-700">{service.description || 'Descrição do serviço vai aqui...'}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1" style={{ color: '#3e94bf' }}>
            Custo do serviço
          </h3>
          <p className="text-gray-700 items-center flex">
            {service.cost || '0,00 '} <Euro className="ml-1" size={15} />
          </p>
        </div>
      </div>

      <RatingStars rating={service.avgReview} />

      {/* Reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4" style={{ color: '#3e94bf' }}>
          Comentários
        </h3>
        {!reviews.length ? (
          <p className="pb-4">Ainda não existem comentários.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={review.user?.foto || defaultUserPhoto}
                      alt={review.user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium text-gray-800">{review.user?.name}</p>
                  </div>
                  <RatingStars rating={review.rating} />
                  <p className="text-sm text-gray-600 mt-3">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="text-sm text-[#3E94BF] disabled:opacity-30"
              >
                ⬅ Anterior
              </button>
              <span className="text-sm text-gray-500">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="text-sm text-[#3E94BF] disabled:opacity-30"
              >
                Seguinte ➡
              </button>
            </div>
          </>
        )}
      </div>

      {service.owner.id !== currentUser.id && condominium.isResident && (
        <Button
          label={isLoading ? 'A requisitar...' : 'Requisitar Serviço'}
          disabled={isLoading}
          onClick={handleRequestService}
        >
          Requesitar Serviço
        </Button>
      )}
      <EditServicePopup
        openPopup={editPopupOpen}
        setOpenPopup={setEditPopupOpen}
        service={selectedService}
        onServiceUpdated={() => window.location.reload()} 
      />
    </>
  );
};

export default ServiceDetailsForm;
