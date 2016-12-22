import React, { PropTypes } from 'react';

import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';

import AudioStreams from 'vclub/views/audioStreams/AudioStreams';
import Header from 'vclub/views/header/Header';

// rooms
import ChatRoom from 'vclub/views/chatRoom/ChatRoom';
import SharingRoom from 'vclub/views/sharingRoom/SharingRoom';
import WhiteBoardRoom from 'vclub/views/whiteBoardRoom/WhiteBoardRoom';
import VideoRoom from 'vclub/views/videoRoom/VideoRoom';

import style from './AuthedLayout.css';

const room = (currentRoom) => {
  switch (currentRoom) {
    case ChatRoomType:
      return <ChatRoom />;
    case SharingRoomType:
      return <SharingRoom />;
    case MediaRoomType:
      return <VideoRoom />;
    case WhiteboardRoomType:
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
    <div className={style.layout}>
      <AudioStreams />
      <Header />
      <div className={style.room}>
        { room(currentRoom) }
      </div>
    </div>
  );
}

AuthedLayout.propTypes = {
  currentRoom: PropTypes.string.isRequired,
};

export default AuthedLayout;
