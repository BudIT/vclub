import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import fallback from 'vclub/utils/hoc/fallback';

import { SocketStatusConnecting, SocketStatusDisconnected } from 'vclub/constants/socketStatus';

import AuthPage from 'vclub/views/authPage/AuthPage';
import AudioStreams from 'vclub/views/audioStreams/AudioStreams';
import Header from 'vclub/views/header/Header';
import Footer from 'vclub/views/footer/Footer';
import Dialog from 'vclub/views/dialog/Dialog';
import ChatPanel from 'vclub/views/chatPanel/ChatPanel';


import Disconnected from './Disconnected/Disconnected';
import Loading from './Loading/Loading';
import RoomContainer from './roomContainer/RoomContainer';

import './ClubLayout.css';


export default composedComponent(
  'ClubLayout',

  connect(state => ({
    auth: state.auth,
    socket: state.socket,
    displayChat: state.ui.displayChat,
  })),

  fallback(Disconnected, ({ socket }) => socket.status === SocketStatusDisconnected),
  fallback(Loading, ({ socket }) => socket.status === SocketStatusConnecting),
  fallback(Loading, ({ auth }) => auth.authenticating),
  fallback(AuthPage, ({ auth }) => !auth.authenticated),

  ({ displayChat }) => (
    <main styleName="container">
      <AudioStreams />
      <Dialog />
      <div styleName="content">
        <Header />
        <div styleName="room">
          <div styleName="room-inner">
            <RoomContainer />
          </div>
        </div>
        <Footer />
      </div>
      {displayChat && (
        <div styleName="sidebar">
          <ChatPanel />
        </div>
      )}
    </main>
  )
);
