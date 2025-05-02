import { useEffect, useState } from 'react';
import { useAuthContext } from '@hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ordersService from '@services/orders';
import servicesService from '@services/servicesService';
import commonAreaService from '@services/commonAreaService';
import RatingStars from '@common/RatingStars';
import { getStatusColor, getStatusText, getUrgencyColor, getUrgencyText } from '@features/orders/orderConsts';
import { dateFormat, getCommonAreaTypeName, truncateText } from '@utils/helperFunctions';
import { Clock, Euro, Users } from 'lucide-react';
import SectionCards from '@common/SectionCards';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HomePageForm = () => {
  const { currentUser } = useAuthContext();
  const { condominiumId: condominiumIdFromUrl } = useParams();
  const navigate = useNavigate();
  const condominiumId = currentUser?.condominium?.id || condominiumIdFromUrl;

  const [orders, setOrders] = useState([]);
  const [commonAreas, setCommonAreas] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    if (!condominiumId) return;

    const fetchAll = async () => {
      setLoadingOrders(true);
      setLoadingAreas(true);
      setLoadingServices(true);

      const [orderData, areaData, serviceData] = await Promise.all([
        ordersService.getOrders(condominiumId, { pageNumber: 1, pageSize: 5 }),
        commonAreaService.getCommonAreasByCondominiumId(condominiumId, { pageNumber: 1, pageSize: 5 }),
        servicesService.getServices(condominiumId, { pageNumber: 1, pageSize: 5 }),
      ]);

      if (!orderData.error) setOrders(orderData.data || []);
      if (!areaData.error) setCommonAreas(areaData.data || []);
      if (!serviceData.error) setServices(serviceData.data || []);

      setLoadingOrders(false);
      setLoadingAreas(false);
      setLoadingServices(false);
    };

    fetchAll();
  }, [condominiumId]);

  const renderCardWrapper = (children) => (
    <motion.div
      layout
      variants={fadeIn}
      initial="hidden"
      animate="show"
      whileHover={{
        scale: 1.03,
        boxShadow: '0 12px 24px rgba(37, 99, 235, 0.35)', // azul mais escuro, mais visível
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 border border-[#e0f2fe]"
    >
      {children}
    </motion.div>
  );

  const renderOrderCard = (order) =>
    renderCardWrapper(
      <div key={order.id}>
        <h3 className="text-lg font-semibold mb-1">Pedido</h3>
        <p className="text-sm text-gray-600">
          {order.description ? truncateText(order.description, 60) : 'Sem descrição'}
        </p>
        <div className="mt-2 text-sm text-gray-500 space-y-1">
          <p>
            <strong>Urgência:</strong>{' '}
            <span className={getUrgencyColor(order.urgency)}>{getUrgencyText(order.urgency)}</span>
          </p>
          <p>
            <strong>Deadline:</strong> {order.votingDeadline ? dateFormat(new Date(order.votingDeadline)) : 'N/A'}
          </p>
          <p>
            <strong>Status:</strong> <span className={getStatusColor(order.status)}>{getStatusText(order.status)}</span>
          </p>
        </div>
      </div>
    );

  const renderCommonAreaCard = (area) =>
    renderCardWrapper(
      <>
        <h3 className="text-lg font-semibold">{area.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{getCommonAreaTypeName(area.type) || 'Categoria Desconhecida'}</p>
        <div className="text-sm text-gray-600 space-y-1">
          {/* Time */}
          <p className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            {area.startSchedule} - {area.endSchedule}
          </p>
          {/* Numero de pessoas  */}
          <p className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            {area.capacity}
          </p>
          {/* Preço */}
          <p className="flex items-center gap-1">
            {area.cost ? `${area.cost.toFixed(2)}` : 'Preço não definido'}
            {area.cost && <Euro className="w-4 h-4 text-gray-400" />}
          </p>
        </div>
      </>
    );

  const renderServiceCard = (service) =>
    renderCardWrapper(
      <>
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
        {service.cost !== undefined && (
          <p className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            {service.cost.toFixed(2)}
            <Euro className="w-4 h-4 text-gray-400" />
          </p>
        )}
        {service.avgReview ? (
          <RatingStars rating={service.avgReview} />
        ) : (
          <p className="text-gray-400 text-sm">Sem Avaliações</p>
        )}
      </>
    );

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#3e94bf] mb-8"
      >
        Bem-vindo ao seu condomínio {currentUser.name}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCards
          title="Pedidos Recentes"
          items={orders}
          isLoading={loadingOrders}
          renderItem={renderOrderCard}
          onViewAll={() => navigate(`/condominium/${condominiumId}/orders`)}
        />

        <SectionCards
          title="Espaços Recentes"
          items={commonAreas}
          isLoading={loadingAreas}
          renderItem={renderCommonAreaCard}
          onViewAll={() => navigate(`/condominium/${condominiumId}/commonarea`)}
        />

        <SectionCards
          title="Serviços Recentes"
          items={services}
          isLoading={loadingServices}
          renderItem={renderServiceCard}
          onViewAll={() => navigate(`/condominium/${condominiumId}/services`)}
        />
      </div>
    </div>
  );
};

export default HomePageForm;
