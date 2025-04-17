import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '../../components/ui';
// import { getRegisterUser } from '../../services/slices/user-Info-slice/user-info';
// import { useDispatch } from '../../services/store';
// import { TRegisterData } from '@api';

export const Register: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // const newUserData: TRegisterData = {
    //   email,
    //   password,
    //   name: userName
    // };
    // dispatch(getRegisterUser(newUserData));
    console.log('Форма отправленна');
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
