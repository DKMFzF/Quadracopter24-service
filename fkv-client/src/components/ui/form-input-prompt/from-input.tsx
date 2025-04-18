import { FC } from "react";
import styles from './from-input.module.scss';

export const FormInput: FC = () => (
  <>
    <form className={styles.form}>
      <input 
        type="text" 
        className={styles.formInput} 
        placeholder="Ввидите для чего вам нужен квадракоптер" 
      />
    </form>
  </>
); 