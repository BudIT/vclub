import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { reset } from 'redux-form';
import { sendMessage } from 'vclub/redux/club/chat';

import MessageBox from 'vclub/views/chatRoom/MessageBox/MessageBox';
import InputBox from 'vclub/views/chatRoom/InputBox/InputBox';
// import styles from './ChatRoom.css';

const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
    username: state.auth.user.name,
  })),
    withHandlers({
      handleSubmit: (props) => (data) => {
        const { dispatch } = props;
        const { message } = data;
        const author = props.username;

        const id = Date.now();
        const date = format(Date.now(), 'HH:mm');
        dispatch(sendMessage({ id, author, date, message }));
        dispatch(reset('chatMessage'));
      },
    }),
);

const ChatRoom = (props) => {
  const { messages, handleSubmit } = props;
  return (
    <section>
      <MessageBox messages={messages} />
      <InputBox onSubmit={handleSubmit} />
    </section>
  );
};

/* eslint-disable */
ChatRoom.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
/* eslint-enable */

export default enhance(ChatRoom);
