import React, { PropTypes } from 'react';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';

function tab(roomName, currentRoomName, index, dispatch) {
  if (roomName === currentRoomName) {
    return (
      <HeaderTab
        isCurrentTab
        key={index.toString()}
        dispatch={dispatch}
      >
        {roomName}
      </HeaderTab>
    );
  }

  return (
    <HeaderTab
      isCurrentTab={false}
      key={index.toString()}
      dispatch={dispatch}
    >
      {roomName}
    </HeaderTab>
  );
}

// changeRoom
function HeaderLeft(props) {
  const {
    roomsNames, currentRoomName,
    dispatch,
  } = props;

  return (
    <ul className={style.ul}>
      {roomsNames.map((roomName, index) => tab(roomName, currentRoomName, index, dispatch))}
    </ul>
  );
}

HeaderLeft.propTypes = {
  currentRoomName: PropTypes.string.isRequired,
  roomsNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default HeaderLeft;
