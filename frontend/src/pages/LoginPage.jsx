import LoginForm from '@features/user/login/LoginForm';
import CircleLogo from '@common/CircleLogo';
import logo from '@public/images/logo.png'
import CentralBoxWithBackGroundVideo from '@layout/CentralBoxWithBackGroundVideo';

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