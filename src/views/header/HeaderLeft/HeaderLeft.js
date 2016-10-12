import React, { PropTypes } from 'react';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';

// changeRoom
function HeaderLeft(props) {
  const {
    roomsNames, currentRoomName,
    dispatch,
  } = props;

  return (
    <ul className={style.ul}>
      {roomsNames.map((roomName, index) => (
        <HeaderTab
          isCurrentTab={roomName === currentRoomName}
          key={index.toString()}
          dispatch={dispatch}
        >
          {roomName}
        </HeaderTab>
      )}
    </ul>
  );
}

HeaderLeft.propTypes = {
  currentRoomName: PropTypes.string.isRequired,
  roomsNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default HeaderLeft;
