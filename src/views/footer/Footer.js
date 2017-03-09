import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import MicButton from './MicButton/MicButton';
import CamButton from './CamButton/CamButton';
import RoomSelectButton from './RoomSelectButton/RoomSelectButton';
import QuickVoteButton from './QuickVoteButton/QuickVoteButton';
import ChatButton from './ChatButton/ChatButton';

import './Footer.css';


export default composedComponent(
  'Footer',

  connect(state => ({
    user: state.auth.user,
  })),

  withHandlers({
    onClick: (props) => () => {
      props.dispatch();
    },
  }),

  ({ user }) => (
    <div styleName="container">
      <div styleName="left_bar">
        {user.master && <RoomSelectButton />}
      </div>
      <div styleName="center_bar">
        <MicButton />
        <CamButton />
      </div>
      <div styleName="right_bar">
        {user.master && <QuickVoteButton />}
        <ChatButton />
      </div>
    </div>
  )
);
