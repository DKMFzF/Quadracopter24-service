import { FC } from 'react';
import styles from './profile.module.scss';
import commonStyles from '../common.module.scss';

type ProfileUIProps = {
  name: string;
  email: string;
  avatar?: string;
};

export const ProfileUI: FC<ProfileUIProps> = ({ name, email, avatar }) => (
  <main className={`${commonStyles.container} ${styles.fadeIn}`}>
    <div className={`mt-30 ${styles.profile}`}>
      <div className={styles.profileSection}>
        {avatar && (
          <div className={styles.avatarContainer}>
            <img 
              src={avatar} 
              alt="Profile" 
              className={styles.avatar}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'default-avatar.png';
              }}
            />
          </div>
        )}
        
        <h2 className="text text_type_main-large mb-6 text-center" style={{ color: '#2d3748' }}>
          Профиль пользователя
        </h2>
        
        <div className={`${styles.field} mb-6`}>
          <span className="text text_type_main-default" style={{ color: '#718096', minWidth: '80px' }}>
            Имя:
          </span>
          <span className="text text_type_main-default ml-4" style={{ color: '#1a202c', fontWeight: 500 }}>
            {name}
          </span>
        </div>
        
        <div className={`${styles.field} mb-6`}>
          <span className="text text_type_main-default" style={{ color: '#718096', minWidth: '80px' }}>
            Email:
          </span>
          <span className="text text_type_main-default ml-4" style={{ color: '#1a202c', fontWeight: 500 }}>
            {email}
          </span>
        </div>
        
        <div className={styles.note}>
          <p className="text text_type_main-default" style={{ color: '#718096' }}>
            Для изменения данных обратитесь к администратору
          </p>
        </div>
      </div>
    </div>
  </main>
);
