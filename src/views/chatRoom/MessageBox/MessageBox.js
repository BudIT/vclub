import React, { PropTypes } from 'react';
import moment from 'moment';

import styles from './MessageBox.css';


function MessageBox(props) {
  const { messages, username } = props;
  return (
    <div className={styles.chat}>
      <div className={styles.welcome}>Добро пожаловать в Онлайн Клуб 3000!</div>
      {messages.map(message => (
        <div key={message.id}>
          <div key={message.id} className={styles.message}>
            <span className={styles.pic}>
              <i className={styles.char}>{message.user.charAt(0)}</i>
            </span>
            <span className={styles.time}>
              {moment.utc(message.date, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
            </span>
            <span className={username === message.user ? styles.self : styles.user}>
              {message.user}
            </span>
            <span className={styles.text}>{message.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  username: PropTypes.string.isRequired,
};

export default MessageBox;
