import AuthBackgroundVideo from '../components/common/AuthBackgroundVideo';
import ChooseCondBox from '../components/layout/ChooseCondBox';
import ChooseCondominiumForm from '../components/features/chooseCondominium/ChooseCondominiumForm';
import LogoutCreateCondDiv from '../components/layout/LogoutCreateCondDiv';

export default function ChooseCondominium() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuthBackgroundVideo />

      <div className="flex items-center justify-center min-h-screen">
        <ChooseCondBox>
          <LogoutCreateCondDiv />
          <ChooseCondominiumForm />
        </ChooseCondBox>
      </div>
    </div>
  );
}
