import React, { PropTypes } from 'react';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';

function tabHOF(currentRoomName, dispatch) {
  return function tab(roomName, index) {
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
  };
}

// changeRoom
function HeaderLeft(props) {
  const {
    roomsNames, currentRoomName,
    dispatch,
  } = props;

  const tab = tabHOF(currentRoomName, dispatch);

  return (
    <ul className={style.ul}>
      {roomsNames.map((roomName, index) => tab(roomName, index))}
    </ul>
  );
}

HeaderLeft.propTypes = {
  currentRoomName: PropTypes.string.isRequired,
  roomsNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default HeaderLeft;
