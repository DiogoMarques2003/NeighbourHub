import { useNavigate } from 'react-router-dom';
import { ArrowLeft} from 'lucide-react';

const GoBack = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center mb-6">
            <button 
            onClick={() => navigate(-1)}
            className="text-blue-500 flex items-center cursor-pointer"
            >
            <ArrowLeft size={20} />
            <span className="ml-1">Voltar</span>
            </button>
        </div>
    )
}

export default GoBack;

