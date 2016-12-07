import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

// subviews
import HeaderRight from './HeaderRight/HeaderRight';
import HeaderLeft from './HeaderLeft/HeaderLeft';

import style from './Header.css';

const enhance = compose(
  connect(state => ({
    numberOfMembers: state.members.length,
    currentRoomName: state.rooms.currentRoom,
    mediaStatus: state.media.status,
  })),
);

function Header(props) {
  const roomsNames = ['SHARING', 'VIDEO', 'CHAT', 'WHITEBOARD'];

  const {
    dispatch,
    numberOfMembers, currentRoomName, mediaStatus,
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
        mediaStatus={mediaStatus}
        dispatch={dispatch}
      />
    </div>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  numberOfMembers: PropTypes.number.isRequired,
  currentRoomName: PropTypes.string.isRequired,
  mediaStatus: PropTypes.number.isRequired,
};

export default enhance(Header);
