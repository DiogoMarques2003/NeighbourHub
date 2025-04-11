import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AuthBox from '../components/layout/AuthBox';
import AuthBackgroundVideo from '../components/common/AuthBackgroundVideo';
import GoBackLayout from '../components/layout/GoBackLayout';
import RegisterForm from '../components/features/register/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuthBackgroundVideo/>

      <div className="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <AuthBox>
            <GoBackLayout />
            <RegisterForm />
        </AuthBox>
      </div>

        
    </div>
  );
};

export default RegisterPage;