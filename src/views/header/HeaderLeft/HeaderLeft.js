import React, { PropTypes, Children } from 'react';

import HeaderTab from './HeaderTab/HeaderTab';

import style from './HeaderLeft.css';

// changeRoom
function HeaderLeft(props) {
  // console.log("headerleft")
  // console.log(props);

  // return different style for tab if tab and room are the same
  // see tab with underline in ui

  const tabs = Children.map(props.children, (roomName, index) => (
    <HeaderTab
      key={index.toString()}
      {...props}
    >
      {roomName}
    </HeaderTab>
  ));

  return (
    <ul className={style.ul}>
      {tabs}
    </ul>
  );
}

HeaderLeft.propTypes = {
  // rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  // currentRoom: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  // getChangeRoomHandlers: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,

  // dispatch: PropTypes.func.isRequired,
};

export default HeaderLeft;
