import LoginForm from '../components/login/LoginForm';
import AuthLayout from '../components/layout/AuthLayout';
import Card from '../components/common/Card';

const LoginPage = () => {
  return (
    <>
      <video className="" autoPlay loop muted>\
        <source src="../../public/videos/backgroundLoginOriginal.mp4" type="video/mp4" />
      </video>
      <AuthLayout>
        <Card>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mt-4 mb-6">Sign In</h1>
            <LoginForm />
          </div>
        </Card>
      </AuthLayout>
    </>
  );
};

export default LoginPage