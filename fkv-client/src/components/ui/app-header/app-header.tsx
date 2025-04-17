import { FC } from 'react';
import styles from './app-header.module.scss';
import { TAppHeaderUIProps } from './type';
import {
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../../image/logo_line.svg';

/**
 * Упрощенный компонент шапки приложения
 * Содержит только две ссылки по краям:
 * - Слева: Оформление заказа
 * - Справа: Личный кабинет
 */
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActiveLink = (path: string, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${
              isActiveLink('/', true) ? styles.link_active : ''
            }`}
          >
            <img src={logoImage} className={styles.img_line_logo} alt="лого-лайн" />
            <p className={styles.header__main_logo}>
              КВАДРАКОПТЕР24
            </p>
          </Link>
        </div>

        <div className={styles.menu_part_right}>
          <Link
            to='/profile'
            className={`${styles.profile_section} ${
              isActiveLink('/profile') ? styles.active : ''
            }`}
          >
            <ProfileIcon
              type={isActiveLink('/profile') ? 'primary' : 'secondary'}
              className={styles.profile_section__icon}
            />
            <span className={styles.profile_section__label}>
              {userName || 'ЛИЧНЫЙ КАБИНЕТ'}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
