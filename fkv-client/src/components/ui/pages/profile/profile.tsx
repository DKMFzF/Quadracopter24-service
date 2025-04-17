import { FC } from 'react';
import styles from './profile.module.scss';

interface ProfileUIProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export const ProfileUI: FC<ProfileUIProps> = ({ name, email, onLogout }) => {
  return (
    <div className={styles.profile}>
      <h2>Профиль</h2>
      <div className={styles.info}>
        <p>Имя: {name}</p>
        <p>Email: {email}</p>
      </div>
      <button 
        onClick={onLogout}
        className={styles.logoutButton}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};
