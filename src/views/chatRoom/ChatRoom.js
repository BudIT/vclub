import React, { Component, PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import MessageBox from 'vclub/views/chatRoom/MessageBox/MessageBox';
import InputBox from 'vclub/views/chatRoom/InputBox/InputBox';
import { turnOnMemberPanel } from 'vclub/redux/club/ui';
import styles from './ChatRoom.css';

const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
  })),
    withHandlers({
      turnUsersPanel: props => () => {
        props.dispatch(turnOnMemberPanel());
      },
    })
);

class ChatRoom extends Component {
  componentWillMount() {
    this.props.turnUsersPanel();
  }

  render() {
    const { messages } = this.props;
    return (
      <section>
        <MessageBox messages={messages} />
        <InputBox />
      </section>
    );
  }
}

/* eslint-disable */
ChatRoom.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  turnUsersPanel: PropTypes.func.isRequired,
};
/* eslint-enable */

export default enhance(ChatRoom);
