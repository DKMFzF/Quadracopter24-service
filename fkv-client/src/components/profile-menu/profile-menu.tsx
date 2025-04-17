import { FC } from 'react';
import { ProfileMenuUI } from '../ui';

export const ProfileMenu: FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  return <ProfileMenuUI handleLogout={handleLogout} />;
};
