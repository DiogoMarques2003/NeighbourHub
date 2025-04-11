import LoginForm from '../components/features/login/LoginForm';
import AuthBackgroundVideo from '../components/common/AuthBackgroundVideo';
import AuthBox from '../components/layout/AuthBox';
import CircleLogo from '../components/common/CircleLogo';

export default function LoginPage() {

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuthBackgroundVideo/>

      <div className="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <AuthBox>
          <CircleLogo 
            src="../../public/images/logo.png"
          />
          <LoginForm />
        </AuthBox>
      </div>
    </div>
  );
}