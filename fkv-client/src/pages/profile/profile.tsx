import { FC } from 'react';
import { ProfileUI } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';
import { logoutUser } from '../../services/slices/user-api';
import { useNavigate, Outlet } from 'react-router-dom';
import { ProfileMenu } from '../../components/profile-menu';
import styles from './profile.module.scss';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <ProfileMenu handleLogout={handleLogout} />
      <div className={styles.profileContent}>
        <Outlet />
      </div>
    </div>
  );
};

export const ProfileInfo: FC = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <ProfileUI 
      name={user || 'Пользователь'} 
      email={user || ''}
    />
  );
};

export const OrdersHistory: FC = () => {
  return (
    <div>
      <h2>История заказов</h2>
      {/* Здесь будет список заказов */}
    </div>
  );
};
