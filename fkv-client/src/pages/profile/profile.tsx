import { FC } from 'react';
import { ProfileUI } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';
import { logoutUser } from '../../services/slices/user-api';
import { useNavigate } from 'react-router-dom';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login', { replace: true }); // Перенаправляем на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <ProfileUI 
      name={user || 'Пользователь'} 
      email={user || ''}
      onLogout={handleLogout}
    />
  );
};
