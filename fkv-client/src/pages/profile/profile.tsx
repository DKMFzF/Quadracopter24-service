import { FC, SyntheticEvent, useEffect, useState, useCallback } from 'react';
// import { useSelector, useDispatch } from '../../services/store';
import { ProfileUI } from '../../components/ui/index';
// import { Preloader } from '../../components/ui';

type ProfileFormState = {
  name: string;
  email: string;
  password: string;
};

/**
 * Компонент страницы профиля пользователя (упрощенная версия без данных)
 */
export const Profile: FC = () => {
  const [formValue, setFormValue] = useState<ProfileFormState>({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    password: ''
  });
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));
    setIsFormChanged(true);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      password: ''
    });
    setIsFormChanged(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('Данные профиля обновлены:', formValue);
    setFormValue((prev) => ({ ...prev, password: '' }));
    setIsFormChanged(false);
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
