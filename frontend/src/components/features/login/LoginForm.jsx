import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import authService from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateCredentials = () => {
    const { email, password } = credentials;

    if(!password || !email) {
      setError('Preencha todos os campos');
      return false;
    }

    setError(null);
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
    
    try {
      const user = await authService.login(credentials);
      setCurrentUser(user);
      navigate("/home");
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      <Button 
        type="submit"
        /* isLoading={isLoading}
        disabled={isLoading} */
      >
        Login
      </Button>

      <div className="text-center mt-2">
        <p>Esqueceu-te palavra passe?</p>
        <p>Não tens conta? <a href="/register" className="text-blue-500">Registar</a></p>
      </div>
    </form>
  );
};

export default LoginForm