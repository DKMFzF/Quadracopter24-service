import { CartQuadcopter } from 'src/components/ui/cart-quadcopter';
import styles from './hero-page.module.scss';
import { FC } from 'react';
import { ImageCard } from 'src/components/ui/image-card';
import qadroPro from '../../image/qadro-pro.png';

export const HeroPage: FC = () => {
  return (
    <main className={styles.containerMain}>
      <div className={styles.main}>
        <CartQuadcopter 
          title='Профессиональные квадрокоптеры' 
          bodyText='Более 50 моделей ведущих мировых производителей'
          buttonText='Попробовать квадрокоптер'
          anchorLink='#'
        />
        <ImageCard
          path={qadroPro}
          alt='Квадрокоптер профессиональный'
        />
      </div>
    </main>
  );
};
