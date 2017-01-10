import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { sendMessage } from 'vclub/redux/club/chat';
import moment from 'moment';
import uuid from 'uuid';

import MessageBox from 'vclub/views/chatRoom/MessageBox/MessageBox';
import InputBox from 'vclub/views/chatRoom/InputBox/InputBox';
import styles from './ChatRoom.css';

const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
    username: state.auth.user.name,
  })),

  withHandlers({
    handleSubmit: (props) => (data) => {
      const { dispatch } = props;
      const { message } = data;
      const user = props.username;

      const id = uuid.v4();
      const date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
      dispatch(sendMessage({ id, user, date, message }));
      dispatch(reset('chatMessage'));
    },
  }),
);

const ChatRoom = (props) => {
  const { messages, handleSubmit, username } = props;

  return (
    <section className={styles.container}>
      <MessageBox messages={messages} username={username} />
      <InputBox onSubmit={handleSubmit} />
    </section>
  );
};

/* eslint-disable */
ChatRoom.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
/* eslint-enable */

export default enhance(ChatRoom);
