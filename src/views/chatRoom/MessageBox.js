import React, { PropTypes } from 'react';
import styles from './MessageBox.css';

function MessageBox(props) {
  const { messages } = props;
  console.log(props.messages)
  return (
    <div>
      {messages.length === 0
        ? <span>No messages</span>
        : messages.map(message => (
          <span key={message.id}>
            <div>
              <span className={styles.author}>{message.author}</span>
              <span className={styles.message}>{message.message}</span>
            </div>
          </span>
        ))}
    </div>
  );
}

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default MessageBox;
