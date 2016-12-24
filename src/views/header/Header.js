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
    user: state.auth.user,
    members: state.members,
    ...state.vote,
  })),
);

function Header(props) {
  const roomsNames = [ChatRoomType, SharingRoomType, MediaRoomType, WhiteboardRoomType];

  const {
    dispatch,
    numberOfMembers,
    currentRoomName,
    user,
  } = props;


  return (
    <div className={style.header}>
      <HeaderLeft
        currentRoomName={currentRoomName}
        roomsNames={roomsNames}
        user={user}
        dispatch={dispatch}
      />
      <HeaderRight
        numberOfMembers={numberOfMembers}
        user={user}
        dispatch={dispatch}
      />
    </div>
  );
}
/*eslint-disable */
Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  numberOfMembers: PropTypes.number.isRequired,
  currentRoomName: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
};
/*eslint-enable */
export default enhance(Header);
