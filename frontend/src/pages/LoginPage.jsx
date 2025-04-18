import LoginForm from '../components/features/login/LoginForm';
import AuthBackgroundVideo from '../components/common/AuthBackgroundVideo';
import AuthBox from '../components/layout/AuthBox';
import CircleLogo from '../components/common/CircleLogo';
import logo from '../../public/images/logo.png'

export default function LoginPage() {

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuthBackgroundVideo/>

      <div className="absolute w-[75%] sm:w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <AuthBox>
          <CircleLogo 
            src={logo}
          />
          <div className="mt-6">
            <LoginForm />
          </div>
        </AuthBox>
      </div>
    </div>
  );
}