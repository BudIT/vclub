import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import MessageBox from 'vclub/views/chatRoom/MessageBox/MessageBox';
import UserList from 'vclub/views/userList/UserList';
import InputBox from 'vclub/views/chatRoom/InputBox/InputBox';
import styles from './ChatRoom.css';

const enhance = compose(
  connect(state => ({
    members: state.members,
    messages: state.chat.messages,
  })),
);

function ChatRoom(props) {
  const { members, messages } = props;
  return (
    <section>
      <UserList members={members} />
      <MessageBox messages={messages} />
      <InputBox />
    </section>
  );
}

ChatRoom.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};


export default enhance(ChatRoom);
