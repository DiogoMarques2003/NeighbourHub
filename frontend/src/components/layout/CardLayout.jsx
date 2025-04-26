import { useNavigate } from "react-router-dom";

const CardLayout = ({ children, item }) => {
    const navigate = useNavigate();

    return (
        <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
        onClick={() => navigate(`${item.id}`)}>
            {children}
        </div>
    );
  };
  
  export default CardLayout;

