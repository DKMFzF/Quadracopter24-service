import { FC } from 'react';
import { ProfileUI } from '../../components/ui/index';

export const Profile: FC = () => {
  const userData = {
    name: 'Иван Иванов',
    email: 'ivan@example.com'
  };

  return <ProfileUI name={userData.name} email={userData.email} />;
};
