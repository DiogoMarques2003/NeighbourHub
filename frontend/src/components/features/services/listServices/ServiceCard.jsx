import ItemCard from '@common/ItemCard';
import RatingStars from '@common/RatingStars';
import { truncateText } from '@utils/helperFunctions';

const ServiceCard = ({ service }) => {
  return (
    <ItemCard navigateTo={service.id}>
      <div className="grid gap-2">
        <p className="text-xl font-semibold">{service.name}</p>
        <p>{truncateText(service.description, 30)}</p>
        <p>{service.cost}</p>
        <RatingStars rating={service.avgReview} />
      </div>
    </ItemCard>
  );
};

export default ServiceCard;
