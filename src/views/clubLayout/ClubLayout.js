import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import fallback from 'vclub/utils/hoc/fallback';

import { SocketStatusConnecting, SocketStatusDisconnected } from 'vclub/constants/socketStatus';

import AuthedLayout from 'vclub/views/authedLayout/AuthedLayout';
import AuthPage from 'vclub/views/authPage/AuthPage';
import UserList from 'vclub/views/userList/UserList';

import Disconnected from './Disconnected/Disconnected';
import Loading from './Loading/Loading';


const enhance = compose(
  connect(state => ({
    auth: state.auth,
    currentRoom: state.rooms.currentRoom,
    showMemberPanel: state.ui.showMemberPanel,
    members: state.members,
    socket: state.socket,
  })),
  fallback(Disconnected, ({ socket }) => socket.status === SocketStatusDisconnected),
  fallback(Loading, ({ socket }) => socket.status === SocketStatusConnecting),
  fallback(Loading, ({ auth }) => auth.authenticating),
  fallback(AuthPage, ({ auth }) => !auth.authenticated),
);

function ClubLayout(props) {
  const { currentRoom, members, showMemberPanel } = props;

  return (
    <main>
      <AuthedLayout currentRoom={currentRoom} />
      {showMemberPanel && <UserList members={members} />}
    </main>
  );
}

ClubLayout.propTypes = {
  currentRoom: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  showMemberPanel: PropTypes.bool.isRequired,
};

export default enhance(ClubLayout);
