import LoginForm from '../components/features/login/LoginForm';
import CircleLogo from '../components/common/CircleLogo';
import logo from '../../public/images/logo.png'
import CentralBoxWithBackGroundVideo from '../components/layout/CentralBoxWithBackGroundVideo';

export default function LoginPage() {

  return (
    <CentralBoxWithBackGroundVideo>
      <CircleLogo
        src={logo}
      />

      <div className="mt-6">
        <LoginForm />
      </div>
    </CentralBoxWithBackGroundVideo >
  );
}