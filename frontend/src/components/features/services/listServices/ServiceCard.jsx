import ItemCard from '@common/ItemCard';
import RatingStars from '@common/RatingStars';
import { truncateText } from '@utils/helperFunctions';
import { Banknote } from 'lucide-react';

const ServiceCard = ({ service }) => {
  return (
    <ItemCard navigateTo={service.id}>
      <div className="grid gap-2">
        <p className="text-xl font-semibold">{service.name}</p>
        <p>{truncateText(service.description, 30)}</p>
        <p className="flex items-center">
          <Banknote size={18} className="mr-2" /> {service.cost ? `${service.cost} €` : 'Gratuito'}
        </p>
        <RatingStars rating={service.avgReview} />
      </div>
    </ItemCard>
  );
};

export default ServiceCard;
