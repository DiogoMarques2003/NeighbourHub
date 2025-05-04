import { useNavigate } from 'react-router-dom';

const ItemCard = ({ navigateTo, children, className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`p-4 border border-gray-200 rounded-md shadow-sm bg-white flex flex-col justify-between h-full cursor-pointer transform transition duration-300 hover:scale-105 ${className}`}
      onClick={() => navigate(navigateTo)}
    >
      {children}
    </div>
  );
};

export default ItemCard;
