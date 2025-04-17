import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;

  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  
  secondName: string;
  setSecondName: Dispatch<SetStateAction<string>>;

  userNumber: string;
  setUserNumber: Dispatch<SetStateAction<string>>;
};
