import { useState } from 'react';

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="block w-72 mx-auto my-5 p-4 bg-black bg-opacity-20 text-white border-0 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="block w-72 mx-auto my-5 p-4 bg-black bg-opacity-20 text-white border-0 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 border-0 text-white p-2.5 text-xl w-80 mx-auto my-5 block cursor-pointer hover:bg-green-600 active:bg-green-700"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center">
            Not a member?{' '}
            <span className="cursor-pointer text-gray-400 hover:text-white">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}