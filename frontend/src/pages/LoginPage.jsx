import { useState } from 'react';
import LoginForm from '../components/features/login/LoginForm';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video 
        className="absolute left-0 top-0 w-screen" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="../../public/videos/backgroundLoginOriginal.mp4" type="video/mp4" />
      </video>

      {/* Inner Container */}
      <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        {/* Login Box */}
        <div className="absolute h-full w-full font-sans text-white bg-black bg-opacity-10 px-0 py-8">
          <h1 className="text-center mx-0 my-8 text-3xl">Login</h1>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
}