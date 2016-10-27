import React, { PropTypes } from 'react';

// subviews
import HeaderRight from './HeaderRight/HeaderRight';
import HeaderLeft from './HeaderLeft/HeaderLeft';

import style from './Header.css';

function Header(props) {
  const roomsNames = ['SHARING', 'VIDEO', 'CHAT', 'WHITEBOARD'];

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

export default Header
