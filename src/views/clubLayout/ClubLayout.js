import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Header from '../header/Header';

// rooms
import ChatRoom from '../chatRoom/ChatRoom';
import SharingRoom from '../sharingRoom/SharingRoom';
import WhiteBoardRoom from '../whiteBoardRoom/WhiteBoardRoom';
import VideoRoom from '../videoRoom/VideoRoom';

const enhance = compose(
  connect(state => ({ state })),
);

// ['SHARING', 'VIDEO', 'CHAT', 'WHITEBOARD']

const displayRoom = (currentRoom) => {
  switch (currentRoom) {
    case 'CHAT':
      return <ChatRoom />;
    case 'SHARING':
      return <SharingRoom />;
    case 'VIDEO':
      return <VideoRoom />;
    case 'WHITEBOARD':
      return <WhiteBoardRoom />;
    default:
      return <ChatRoom />;
  }
};

function ClubLayout(props) {
  return (
    <div>
      <Header />
      <main>
        {displayRoom(props.state.rooms.currentRoom)}
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default enhance(ClubLayout);
