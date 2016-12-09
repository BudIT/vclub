import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';

// subviews
import HeaderRight from './HeaderRight/HeaderRight';
import HeaderLeft from './HeaderLeft/HeaderLeft';

import style from './Header.css';

const enhance = compose(
  connect(state => ({
    numberOfMembers: state.members.length,
    currentRoomName: state.rooms.currentRoom,
  })),
);

function Header(props) {
  const roomsNames = [ChatRoomType, SharingRoomType, MediaRoomType, WhiteboardRoomType];

  const {
    dispatch,
    numberOfMembers, currentRoomName,
  } = props;


  return (
    <div className={style.header}>
      <HeaderLeft
        currentRoomName={currentRoomName}
        roomsNames={roomsNames}
        dispatch={dispatch}
      />
      <HeaderRight
        numberOfMembers={numberOfMembers}
        dispatch={dispatch}
      />
    </div>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  numberOfMembers: PropTypes.number.isRequired,
  currentRoomName: PropTypes.string.isRequired,
};

export default enhance(Header);
