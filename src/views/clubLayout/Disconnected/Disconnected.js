import React from 'react';

import styles from './Disconnected.css';


export default function Disconnected() {
  return (
    <div className={styles.container}>
      <span>Приложение было отключенно от сервера. Обновите страницу или попробуйте позже.</span>
    </div>
  );
}
