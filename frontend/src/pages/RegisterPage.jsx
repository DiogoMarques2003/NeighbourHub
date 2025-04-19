import GoBackLayout from '../components/layout/GoBackLayout';
import RegisterForm from '../components/features/register/RegisterForm';
import CentralBoxWithBackGroundVideo from '../components/layout/CentralBoxWithBackGroundVideo';

const RegisterPage = () => {
  return (
    <CentralBoxWithBackGroundVideo>
      <GoBackLayout />
      <RegisterForm />
    </CentralBoxWithBackGroundVideo>
  );
};

export default RegisterPage;