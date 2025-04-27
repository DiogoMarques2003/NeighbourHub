import { useAuthContext } from '@hooks/useAuthContext';
import servicesService from '@services/servicesService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipboardList, Mail, Phone } from 'lucide-react';
import DropDown from '@common/DropDown';
import defaultAvatar from '@public/images/defaultUserAvatar.jpg';
import RatingStars from '@common/RatingStars';
import requestService from '@services/requestService';
import reviewsService from '@services/reviewsService';




const ServiceRequestDetailsForm = () => {
  const { condominiumId, serviceId, serviceRequestId } = useParams();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const [serviceRequest, setServiceRequest] = useState(null);
  const [service, setService] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isEditingReview, setIsEditingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = await requestService.getServiceRequestById(
          condominiumId,
          serviceId,
          serviceRequestId
        );
        if (requestData?.error) {
          toast.error('Erro ao buscar pedido.');
          navigate(-1);
          return;
        }
        setServiceRequest(requestData);
        setNewStatus(requestData.status);

        const serviceData = await servicesService.getServiceById(condominiumId, serviceId);
        if (serviceData?.error) {
          toast.error('Erro ao buscar serviço.');
          navigate(-1);
          return;
        }
        setService(serviceData);

        if (requestData.review) {
          setReview(requestData.review);
          setRating(requestData.review.rating);
          setComment(requestData.review.comment);
        }
      } catch (error) {
        toast.error('Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [condominiumId, serviceId, serviceRequestId, navigate]);

  const handleRatingClick = (index) => {
    if (review && !isEditingReview) return;
    setRating(index);
  };

  const handleSubmitReview = async () => {
    if (!rating) {
      toast.error('Atribua uma classificação.');
      return;
    }

    const reviewData = { rating, comment };
    let result;

    if (review?.id) {
      result = await reviewsService.updateReviewByRequest(
        condominiumId,
        serviceId,
        serviceRequestId,
        review.id,
        reviewData
      );
    } else {
      result = await reviewsService.createServiceReview(condominiumId, serviceId, serviceRequestId, reviewData);
    }

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Review enviada com sucesso!');
  };

  const handleSaveStatusChange = async () => {
    if (!newStatus) {
      toast.error('Selecione um estado antes de salvar.');
      return;
    }

    if (newStatus === serviceRequest.status) {
      toast.info('Nenhuma alteração feita no estado.');
      return;
    }

    try {
      const result = await requestService.updateServiceRequestStatus(
        condominiumId,
        serviceId,
        serviceRequestId,
        newStatus
      );

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setServiceRequest((prev) => ({
        ...prev,
        status: newStatus,
      }));

      toast.success('Estado atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao tentar salvar novo status:', error);
      toast.error('Erro ao atualizar estado.');
    }
  };

  if (loading) return <p className="p-8 text-gray-500">A carregar...</p>;
  if (!serviceRequest || !service) return null;

  const isRequester = currentUser?.id === serviceRequest.userId;
  const isOwner = currentUser?.id === service?.owner?.id;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#3e94bf] mb-8">Serviço: {service?.name}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#3e94bf] mb-2">Estado Atual:</h2>
        <p className="text-lg font-medium">
          O seu serviço está{' '}
          <span
            className={`font-bold ${
              serviceRequest.status === 'COMPLETED'
                ? 'text-green-600'
                : serviceRequest.status === 'APPROVED' || serviceRequest.status === 'PENDING'
                ? 'text-yellow-500'
                : serviceRequest.status === 'CANCELLED'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {serviceRequest.status === 'PENDING' && 'Pendente'}
            {serviceRequest.status === 'APPROVED' && 'Aprovado'}
            {serviceRequest.status === 'COMPLETED' && 'Concluído'}
            {serviceRequest.status === 'CANCELLED' && 'Cancelado'}
          </span>
        </p>

        {service?.createdAt && (
          <p className="text-gray-500 text-sm mt-2">
            Criado em: {new Date(service.createdAt).toLocaleDateString('pt-PT')}
          </p>
        )}
      </div>

      {service?.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#3e94bf]">Descrição do Serviço:</h2>
          <p className="text-gray-800 mt-2">{service.description}</p>
        </div>
      )}

      {/* Informações do Outro Utilizador */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full md:w-1/2 mt-8">
        <h2 className="text-xl font-bold text-[#3e94bf] mb-6">
          {isOwner ? 'Informações do Cliente' : 'Informações do Prestador'}
        </h2>

        <div className="flex items-center gap-6 mb-4">
          <img
            src={isOwner ? serviceRequest?.user?.foto || defaultAvatar : service?.owner?.foto || defaultAvatar}
            alt="Foto de perfil"
            className="w-24 h-24 object-cover rounded-full border"
          />

          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800">
              {isOwner ? serviceRequest?.user?.name : service?.owner?.name}
            </p>

            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <a
                href={`tel:${isOwner ? serviceRequest?.user?.phoneNumber : service?.owner?.phoneNumber}`}
                className="flex items-center hover:text-blue-500"
              >
                <Phone size={16} className="mr-1" />
                {isOwner ? serviceRequest?.user?.phoneNumber : service?.owner?.phoneNumber}
              </a>
            </div>

            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <a
                href={`mailto:${isOwner ? serviceRequest?.user?.email : service?.owner?.email}`}
                className="flex items-center hover:text-blue-500"
              >
                <Mail size={16} className="mr-1" />
                {isOwner ? serviceRequest?.user?.email : service?.owner?.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="mb-5 mt-5">
          <h3 className="text-lg font-semibold text-[#3e94bf] mb-2">Alterar Estado do Pedido:</h3>
          <DropDown
            listOptions={{
              PENDING: 'Pendente',
              APPROVED: 'Aprovado',
              COMPLETED: 'Concluído',
              CANCELLED: 'Cancelado',
            }}
            choice={newStatus}
            setChoice={setNewStatus}
            dropBoxPlaceHolder="Selecione o novo estado"
            icon={ClipboardList}
          />

          <button
            onClick={handleSaveStatusChange}
            className="mt-4 px-4 py-2 bg-[#3e94bf] text-white rounded hover:bg-blue-600"
          >
            Salvar Alteração
          </button>
        </div>
      )}

      {isRequester && serviceRequest.status === 'COMPLETED' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full md:w-1/2 mt-8">
          <h3 className="text-lg font-semibold text-[#3e94bf] mb-4">A sua review</h3>

          <div className="flex mb-4">
            {[0, 1, 2, 3, 4].map((i) => {
              const currentStarValue = i + 1;
              return (
                <div
                  key={i}
                  className="relative w-8 h-8 cursor-pointer"
                  onClick={(e) => {
                    const { left, width } = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - left;
                    const clickedHalf = clickX < width / 2 ? 0.5 : 1;
                    handleRatingClick(i + clickedHalf);
                  }}
                >
                  <span
                    className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-2xl ${
                      rating >= currentStarValue
                        ? 'text-yellow-400'
                        : rating >= currentStarValue - 0.5
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {rating >= currentStarValue ? '★' : rating >= currentStarValue - 0.5 ? '⯪' : '★'}
                  </span>
                  <span className="invisible text-2xl">★</span> 
                </div>
              );
            })}
          </div>

          <label className="text-sm font-semibold text-gray-700 mb-2 block">Comentário</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Placeholder"
            disabled={review && !isEditingReview}
            className={`w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3 rounded-md mb-4 focus:ring focus:ring-blue-200 focus:outline-none ${
              review && !isEditingReview ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            rows="4"
          />

          {review && !isEditingReview ? (
            <button
              onClick={() => setIsEditingReview(true)}
              className="w-full px-4 py-2 bg-[#3e94bf] text-white rounded hover:bg-blue-600 transition-all"
            >
              Editar Review
            </button>
          ) : (
            <button
              onClick={handleSubmitReview}
              className="w-full px-4 py-2 bg-[#3e94bf] text-white rounded hover:bg-blue-600 transition-all"
            >
              Avaliar
            </button>
          )}
        </div>
      )}

      {isOwner && review && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full md:w-1/2 mt-8">
          <h3 className="text-lg font-semibold text-[#3e94bf] mb-4">Review Recebida</h3>

          <RatingStars rating={review.rating} />

          <p className="text-gray-700">{review.comment}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestDetailsForm;
