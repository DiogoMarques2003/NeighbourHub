import GoBackLayout from '@common/GoBack';
import RegisterForm from '@features/user/register/RegisterForm';
import CentralBoxWithBackGroundVideo from '@layout/CentralBoxWithBackGroundVideo';

const RegisterPage = () => {
  return (
    <CentralBoxWithBackGroundVideo>
      <GoBackLayout />
      <RegisterForm />
    </CentralBoxWithBackGroundVideo>
  );
};

export default RegisterPage;