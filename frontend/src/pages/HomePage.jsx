import Button from "../components/common/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const { currentUser, logout, isLoading } = useAuthContext();
    const navigate = useNavigate();
    return (
        <div>Home Page
            <h1>Olá {!isLoading ? currentUser?.name : ''}</h1>
            <Button
            type="submit"
            fullWidth
            onClick={() => {
                logout();
                navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>

        
    )
}