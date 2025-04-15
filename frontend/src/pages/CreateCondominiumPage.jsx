import AuthBackgroundVideo from "../components/common/AuthBackgroundVideo";
import CreateCondominiumForm from "../components/features/createCondominium/CreateCondominiumForm";
import AuthBox from '../components/layout/AuthBox';
import GoBackLayout from "../components/layout/GoBackLayout";

export default function CreateCondominium() {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <AuthBackgroundVideo />
  
        <div className="flex items-center justify-center min-h-screen">
          <AuthBox>
            <GoBackLayout/>
            <CreateCondominiumForm/>
          </AuthBox>
        </div>
      </div>
    );
  }