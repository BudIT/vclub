import React from 'react';
import uuid from 'uuid';
import { reset } from 'redux-form';
import ServerTime from 'vclub/utils/ServerTime';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { sendMessage } from 'vclub/redux/club/chat';

import MessageBox from './messageBox/MessageBox';
import InputBox from './inputBox/InputBox';

import './ChatPanel.css';


export default composedComponent(
  'ChatPanel',

  connect(state => ({
    messages: state.chat.messages,
    me: state.auth.user,
    allMembers: state.members.all,
  })),

  withHandlers({
    onSubmit: (props) => (data) => {
      const { dispatch, me } = props;

      dispatch(sendMessage({
        id: uuid.v4(),
        userId: me.id,
        date: ServerTime.now(),
        message: data.message,
      }));
      dispatch(reset('chatMessage'));
    },
  }),

  ({ messages, me, allMembers, onSubmit }) => (
    <div styleName="container">
      <header styleName="header">Чат</header>
      <MessageBox messages={messages} me={me} allMembers={allMembers} />
      <InputBox onSubmit={onSubmit} />
    </div>
  )
);
