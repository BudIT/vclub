import React, { PropTypes } from 'react';

import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';


const roomTitles = {
  [ChatRoomType]: 'Беседка',
  [SharingRoomType]: 'Шеринг',
  [WhiteboardRoomType]: 'Доска',
  [MediaRoomType]: 'Медиа',
};

// changeRoom
function HeaderLeft(props) {
  const {
    roomsNames,
    currentRoomName,
    dispatch,
    user,
  } = props;

  return (
    <ul className={style.ul}>
      {roomsNames.map((roomName, index) => (
        <HeaderTab
          isCurrentTab={roomName === currentRoomName}
          key={index.toString()}
          user={user}
          roomName={roomName}
          dispatch={dispatch}
        >
          {roomTitles[roomName] || roomName}
        </HeaderTab>
      ))}
    </ul>
  );
}

HeaderLeft.propTypes = {
  currentRoomName: PropTypes.string.isRequired,
  roomsNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
};

export default HeaderLeft;
