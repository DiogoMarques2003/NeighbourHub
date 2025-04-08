import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
/* import { useAuth } from '../../hooks/useAuth'; */

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  /* const { login } = useAuth(); */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button type="submit">Login</Button>
      <div className="text-center mt-2">
        <p>Esqueceu-te palavra passe?</p>
        <p>Não tens conta? <a href="/register" className="text-blue-500">Registar</a></p>
      </div>
    </form>
  );
};

export default LoginForm