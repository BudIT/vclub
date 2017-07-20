import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import fallback from 'vclub/utils/hoc/fallback';

import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';

import SharingRoom from 'vclub/views/sharingRoom/SharingRoom';
import WhiteBoardRoom from 'vclub/views/whiteBoardRoom/WhiteBoardRoom';
import StreamRoom from 'vclub/views/streamRoom/StreamRoom';
import ConferenceRoom from 'vclub/views/conferenceRoom/ConferenceRoom';


export default composedComponent(
  'RoomContainer',

  connect(state => ({
    room: state.rooms.currentRoom,
  })),

  fallback(ConferenceRoom, ({ room }) => room === ChatRoomType),
  fallback(SharingRoom, ({ room }) => room === SharingRoomType),
  fallback(StreamRoom, ({ room }) => room === MediaRoomType),
  fallback(WhiteBoardRoom, ({ room }) => room === WhiteboardRoomType),

  () => (
    <div>Not implemented!!!</div>
  )
);
