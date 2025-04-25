import UserSettingsForm from '../components/features/settings/UserSettingsForm';
import CentralBoxWithBackGroundVideo from '../components/layout/CentralBoxWithBackGroundVideo';
import GoBackLayout from '../components/layout/GoBackLayout';

const UserSettingsPage = () => {
  return (
    <CentralBoxWithBackGroundVideo>
      <GoBackLayout />
      <UserSettingsForm />
    </CentralBoxWithBackGroundVideo>
  );
};

export default UserSettingsPage;
