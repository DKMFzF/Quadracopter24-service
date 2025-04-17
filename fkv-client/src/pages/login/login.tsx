import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, clearError } from '../../services/slices/user-api';
import { Navigate } from 'react-router-dom';

type LoginState = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    dispatch(clearError());
    dispatch(loginUser({
      email: formData.email,
      password: formData.password
    }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setIsLoggedIn(true);
    }
  }, [status]);

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <LoginUI
      errorText={typeof error === 'string' ? error : error?.detail?.[0]?.msg || ''}
      email={formData.email}
      setEmail={(value: any) => setFormData(prev => ({...prev, email: value}))}
      password={formData.password}
      setPassword={(value: any) => setFormData(prev => ({...prev, password: value}))}
      handleSubmit={handleSubmit}
    />
  );
};
