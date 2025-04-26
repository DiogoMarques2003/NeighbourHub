import AuthBackgroundVideo from '@common/AuthBackgroundVideo';
import ChooseCondBox from '@layout/ChooseCondBox';
import ChooseCondominiumForm from '@features/condominium/chooseCondominium/ChooseCondominiumForm';
import LogoutCreateCondDiv from '@layout/LogoutCreateCondDiv';

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
