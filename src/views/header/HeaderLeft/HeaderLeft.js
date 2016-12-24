import React, { PropTypes } from 'react';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';

// changeRoom
function HeaderLeft(props) {
  const {
    roomsNames, currentRoomName,
    dispatch,
    user,
  } = props;

  return (
    <ul className={style.ul}>
      {roomsNames.map((roomName, index) => (
        <HeaderTab
          isCurrentTab={roomName === currentRoomName}
          key={index.toString()}
          dispatch={dispatch}
          user={user}
        >
          {roomName}
        </HeaderTab>
      ))}
    </ul>
  );
}
/*eslint-disable */
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
/*eslint-enable */
export default HeaderLeft;
