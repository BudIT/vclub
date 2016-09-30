import React from 'react';

import compose      from 'recompose/compose';
import { connect }  from 'react-redux';

// subviews
import HeaderRight  from './HeaderRight/HeaderRight';
import HeaderLeft   from './HeaderLeft/HeaderLeft'

// actions
import { memberLeave }          from 'vclub/redux/club/members'
import { toggleMemberPanel }    from 'vclub/redux/club/ui'
import { changeRoom }           from 'vclub/redux/club/rooms'

import style from './Header.css'

const enhance = compose(
  connect(state => ({ state })),
);

function Header(props){

  const roomsNames = [`SHARING`, `VIDEO`, `CHAT`, `WHITEBOARD`]

  // handle state
  const {
    dispatch,
  } = props

  const {
    members,
    rooms,
  } = props.state
  // end

  console.log("state")
  console.log(props.state)

  return (
    <div className={style.header}>
      <HeaderLeft
        rooms={roomsNames}
        currentRoom={rooms.currentRoom}

        changeRoom={changeRoom}

        dispatch={dispatch}
      >
        {"Sharing"}
        {"Video"}
        {"Chat"}
        {"Whiteboard"}
      </HeaderLeft>
    <HeaderRight
      numberOfMembers={members.length}

      logOut={memberLeave}
      toggleMemberPanel={toggleMemberPanel}

      dispatch={dispatch}
    />
    </div>
  )
}

export default enhance(Header);
