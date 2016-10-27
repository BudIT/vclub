import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Header from './Header'

const enhance = compose(
  connect(state => ({
    numberOfMembers: state.members.length,
    currentRoomName: state.rooms.currentRoom,
  })),
);

export default enhance(Header);
