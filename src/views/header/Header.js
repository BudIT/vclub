import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

// actions
import { logOut } from 'vclub/redux/club/auth';
import { toggleMemberPanel } from 'vclub/redux/club/ui';
import { changeRoom } from 'vclub/redux/club/rooms';

// subviews
import HeaderRight from './HeaderRight/HeaderRight';
import HeaderLeft from './HeaderLeft/HeaderLeft';

import style from './Header.css';

const enhance = compose(
  connect(state => ({
    members: state.members,
    rooms: state.rooms,
  })),
);

function Header(props) {
  const roomsNames = ['SHARING', 'VIDEO', 'CHAT', 'WHITEBOARD'];

  // handle state
  const {
    dispatch,
  } = props;

  const {
    members,
    rooms,
  } = props;
  // end

  // console.log("props")
  // console.log(props)

  return (
    <div className={style.header}>
      <HeaderLeft
        rooms={roomsNames}
        currentRoom={rooms.currentRoom}

        changeRoom={changeRoom}

        dispatch={dispatch}
      >
        {'Sharing'}
        {'Video'}
        {'Chat'}
        {'Whiteboard'}
      </HeaderLeft>
      <HeaderRight
        numberOfMembers={members.length}

        logOut={logOut}
        toggleMemberPanel={toggleMemberPanel}

        dispatch={dispatch}
      />
    </div>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.element).isRequired,
  rooms: PropTypes.shape(PropTypes.element).isRequired,
};

export default enhance(Header);
