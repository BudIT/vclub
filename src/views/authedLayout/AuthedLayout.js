import React, { PropTypes } from 'react';

// import compose from 'recompose/compose';
// import { connect } from 'react-redux';

import Header from 'vclub/views/header/Header';

// rooms
import ChatRoom from 'vclub/views/chatRoom/ChatRoom';
import SharingRoom from 'vclub/views/sharingRoom/SharingRoom';
import WhiteBoardRoom from 'vclub/views/whiteBoardRoom/WhiteBoardRoom';
import VideoRoom from 'vclub/views/videoRoom/VideoRoom';

// const enhance = compose();

const room = (currentRoom) => {
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
      return 'Not implemented';
  }
};

function AuthedLayout(props) {
  const {
    currentRoom,
  } = props;

  return (
    <div>
      <Header />
      { room(currentRoom) }
    </div>
  );
}

AuthedLayout.propTypes = {
  currentRoom: PropTypes.string.isRequired,
};

export default AuthedLayout;
