import { FC } from 'react';
import style from './cart-quadcopter.module.scss';
import CardQuadcopter from './type';

export const CartQuadcopter: FC<CardQuadcopter> = ({ 
  title,
  bodyText,
  buttonText,
  anchorLink
}) => (
  <article className={style.card}>
    <div className={style.card__content}>
      <h3 className={style.card__title}>{title}</h3>
      <p className={style.card__body}>{bodyText}</p>
    </div>
    <a href={anchorLink} className={style.card__link}>
      {buttonText}
      <span className={style.card__linkArrow}>→</span>
    </a>
  </article>
);
