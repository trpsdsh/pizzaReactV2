import React from 'react';
import styles from './NotFoundBlock.module.scss';
console.log(styles);
const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>◉_◉</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>Страница отсутствует</p>
    </div>
  );
};
export default NotFoundBlock;
