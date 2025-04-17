import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, clearError } from '../../services/slices/user-api';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(false);

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [userNumber, setUserNumber] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(
      registerUser({
        email,
        password,
        first_name: userName,
        second_name: secondName,
        phone: userNumber,
      })
    );
  };

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('Успешная регистрация!');
      setIsRegistered(true);
    }
  }, [status]);

  if (isRegistered) return <Navigate to="/profile" replace />;

  return (
    <RegisterUI
      errorText={typeof error === 'string' ? error : error?.detail?.[0]?.msg || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      setSecondName={setSecondName}
      secondName={secondName}
      handleSubmit={handleSubmit}
      userNumber={userNumber}
      setUserNumber={setUserNumber}
    />
  );
};
