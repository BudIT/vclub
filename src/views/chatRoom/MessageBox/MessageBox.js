import React, { PropTypes } from 'react';
import moment from 'moment';
import style from './MessageBox.css';

function MessageBox(props) {
  const { messages, styles, username } = props;
  return (
    <div className={style.chat}>
      {messages.length === 0
        ? <span>No messages</span>
        : messages.map(message => (
          <span key={message.id}>
            <div className={style.message}>
              <span className={styles.pic}>
                <i className={styles.char}>{message.user.charAt(0)}</i>
              </span>
              <span className={username === message.user ? style.self : style.user}>
                {message.user}
              </span>
              <span className={style.time}>
                {moment.utc(message.date, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
              </span>
              <span className={style.text}>{message.message}</span>
            </div>
          </span>
        ))}
    </div>
  );
}
/* eslint-disable */
MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  styles: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};
/* eslint-enable */
export default MessageBox;

