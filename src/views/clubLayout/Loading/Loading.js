import React from 'react';

import styles from './Loading.css';


export default function Loading() {
  return (
    <div className={styles.container}>
      <span>Загрузка приложения...</span>
    </div>
  );
}
