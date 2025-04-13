import { useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { removeToken } from '../../utils/helperFunctions';

const LogoutCreateCondDiv = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex items-center mb-6">
        <button
          onClick={() => {
            removeToken();
            navigate('/login');
          }}
          className="text-blue-500 flex items-center cursor-pointer"
        >
          <LogOut size={20} />
          <span className="ml-1">Terminar sessão</span>
        </button>
      </div>

      <div className="flex items-center mb-6">
        <button className="text-blue-500 flex items-center cursor-pointer">
          <Plus size={20} />
          <span className="ml-1">Criar Condominio</span>
        </button>
      </div>
    </div>
  );
};

export default LogoutCreateCondDiv;
