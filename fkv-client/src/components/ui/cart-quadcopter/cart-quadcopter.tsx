import { FC } from 'react';
import style from './cart-quadcopter.module.scss';
import { useNavigate } from 'react-router-dom';

interface CardQuadcopter {
  title: string;
  bodyText: string;
  buttonText: string;
  anchorLink?: string;
}

export const CartQuadcopter: FC<CardQuadcopter> = ({ 
  title,
  bodyText,
  buttonText,
  anchorLink
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Передаем только необходимые данные вместо всего объекта location
    navigate('/modal', { state: { background: true } });
  };

  return (
    <article className={style.card}>
      <div className={style.card__content}>
        <h3 className={style.card__title}>{title}</h3>
        <p className={style.card__body}>{bodyText}</p>
      </div>
      <button onClick={handleClick} className={style.card__link}>
        {buttonText}
        <span className={style.card__linkArrow}>→</span>
      </button>
    </article>
  );
};
