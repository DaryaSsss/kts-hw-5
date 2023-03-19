import React from 'react';

import styles from './Card.module.scss';

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  category?: string;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  category
}) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <img src={image} alt="card item" className={styles.card_image} />
      {category && <span className={styles.card_category}>{category}</span>}
      <span className={styles.card_title}>{title}</span>
      {subtitle && <span className={styles.card_subtitle}>{subtitle}</span>}
      {content && <span className={styles.card_content}>${content}</span>}
    </div>
  );
};
