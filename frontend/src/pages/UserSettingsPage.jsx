import UserSettingsForm from '@features/user/settings/UserSettingsForm';
import CentralBoxWithBackGroundVideo from '@layout/CentralBoxWithBackGroundVideo';
import GoBackLayout from '@common/GoBack';

const UserSettingsPage = () => {
  return (
    <CentralBoxWithBackGroundVideo>
      <GoBackLayout />
      <UserSettingsForm />
    </CentralBoxWithBackGroundVideo>
  );
};

export default UserSettingsPage;
