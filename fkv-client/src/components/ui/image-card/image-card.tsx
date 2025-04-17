import { FC } from "react";
import style from './image-card.module.scss';
import ImageCardProps from "./type";

export const ImageCard: FC<ImageCardProps> = ({
  path,
  alt
}) => (
  <article className={style.imgContainer}>
    <img 
      className={style.imgCard} 
      src={path} 
      alt={alt}
      loading="lazy"
    />
  </article>
);
