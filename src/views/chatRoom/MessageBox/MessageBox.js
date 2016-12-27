import React, { PropTypes } from 'react';
import moment from 'moment';
import style from './MessageBox.css';

function MessageBox(props) {
  const { messages } = props;
  return (
    <div className={style.chat}>
      {messages.length === 0
        ? <span>No messages</span>
        : messages.map(message => (
          <span key={message.id}>
            <div className={style.self}>
              <span className={style.pic}>
                <i className={style.char}>{message.user.charAt(0)}</i>
              </span>
              <span className={style.user}>{message.user}</span>
              <span className={style.message}>{moment(message.date).local().format('HH:mm')}</span>
              <span className={style.message}>{message.message}</span>
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
};
/* eslint-enable */
export default MessageBox;


/*
    <ol class="chat">
    <li class="other">
        <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div class="msg">
        <p>Qué contexto de Góngora? <emoji class="suffocated"/></p>
        <time>20:18</time>
      </div>
    </li>
    <li class="self">
        <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div class="msg">
        <p>El que mandó Marialu</p>
        <p>Es para mañana...</p>
        <time>20:18</time>
      </div>
    </li>
*/
