import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { changeRoom } from 'vclub/redux/club/rooms';
import getRoomTitle from 'vclub/utils/getRoomTitle';

// subviews
import HeaderRight from './HeaderRight/HeaderRight';
import RoomSelect from './RoomSelect/RoomSelect';

import styles from './Header.css';


const enhance = compose(
  connect(state => ({
    numberOfMembers: state.members.length,
    currentRoomName: state.rooms.currentRoom,
    user: state.auth.user,
    showMemberPanel: state.ui.showMemberPanel,
  })),
  withHandlers({
    onRoomChange: (props) => (roomName) => {
      props.dispatch(changeRoom(roomName));
    },
  }),
);

export function HeaderComponent(props) {
  const {
    dispatch,
    numberOfMembers,
    currentRoomName,
    showMemberPanel,
    user,
    onRoomChange,
  } = props;


  return (
    <div className={styles.header}>
      {user.master && (
        <RoomSelect
          currentRoomName={currentRoomName}
          user={user}
          onChange={onRoomChange}
        />
      )}
      {!user.master && (
        <div className={styles.roomTitle}>
          {getRoomTitle(currentRoomName)}
        </div>
      )}
      <HeaderRight
        numberOfMembers={numberOfMembers}
        showMemberPanel={showMemberPanel}
        user={user}
        dispatch={dispatch}
      />
    </div>
  );
}

HeaderComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  numberOfMembers: PropTypes.number.isRequired,
  currentRoomName: PropTypes.string.isRequired,
  showMemberPanel: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  onRoomChange: PropTypes.func.isRequired,
};

export default enhance(HeaderComponent);
