import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '../../components/ui';

type LoginState = {
  email: string;
  password: string;
};

/**
 * Компонент страницы входа в систему
 */
export const Login: FC = () => {
  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    console.log('Форма отправлена:', formData);
  };

  return (
    <LoginUI
      errorText={''} // Пустая строка вместо ошибки
      email={formData.email}
      setEmail={(value: any) =>
        handleInputChange({
          target: { name: 'email', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      password={formData.password}
      setPassword={(value: any) =>
        handleInputChange({
          target: { name: 'password', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      handleSubmit={handleSubmit}
    />
  );
};
