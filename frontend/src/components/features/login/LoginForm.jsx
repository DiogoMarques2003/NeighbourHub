import { useState } from 'react';
import { Mail, Lock } from "lucide-react";
import authService from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import InputWithIcon from '../../common/InputWithIcon';
import Button from '../../common/Button';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { removeToken } from '../../../utils/helperFunctions.js';
import ErrorBar from '../../common/ErrorBar.jsx';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { updateCurrentUser } = useAuthContext();
  const navigate = useNavigate();


  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const validateCredentials = () => {
    const { email, password } = credentials;

    if(!password || !email.trim()) {
      setError('Preencha todos os campos');
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCredentials()) return;
    setIsLoading(true);

    const result = await authService.login(credentials);
    if (result?.error || !result) {
      setError(result?.error || 'Failed to login');
      setIsLoading(false);
      return;
    }
    
    const currentUser = await authService.getCurrentUser(result?.token);
    if (!currentUser || currentUser.error) {
      setError(currentUser?.error || 'Failed to get user profile');
      removeToken();
      setIsLoading(false);
      return;
    }

    updateCurrentUser(currentUser);
    setIsLoading(false);
    navigate("/condominium");
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>      
      {error && <ErrorBar error={error}/>}

      <div className="space-y-4">
        <InputWithIcon
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        
        <InputWithIcon
          icon={Lock}
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />

        <div className="mt-6">
        <Button
          type="submit" 
          isLoading={isLoading}
          fullWidth
          variant='primary'
        >
          Login
        </Button>
        </div>
        
        <div className="text-center mt-3">
          <a href="/reset-password" className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline">
            Esqueceste-te da palavra-passe?
          </a>
        </div>

        <div className="text-center text-sm text-gray-600 mt-2">
          Não tens conta? <a href="/register" className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline">Registar</a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;