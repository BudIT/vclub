import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import AuthedLayout from 'vclub/views/authedLayout/AuthedLayout';
import AuthPage from 'vclub/views/authPage/AuthPage';
import UserList from 'vclub/views/userList/UserList';

const enhance = compose(
  connect(state => ({
    authenticated: state.auth.authenticated,
    currentRoom: state.rooms.currentRoom,
    showMemberPanel: state.ui.showMemberPanel,
    members: state.members,
    rtc: state.rtc,
    media: state.media,
  })),
);

function ClubLayout(props) {
  const {
    rtc, authenticated, currentRoom, members, showMemberPanel, dispatch, media,
  } = props;

  const audioStreams = Object.keys(rtc.audioStreams).map(key => rtc.audioStreams[key]);

  return (
    <div>
      <main>
        {authenticated === false
          ? <AuthPage dispatch={dispatch} />
          : <AuthedLayout currentRoom={currentRoom} />
        }
        {showMemberPanel && <UserList members={members} />}
        {JSON.stringify(media)}
        {audioStreams.map(stream => (
          <audio ref={el => el && (el.srcObject = stream)} autoPlay controls />
        ))}
      </main>
    </div>
  );
}

ClubLayout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentRoom: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  showMemberPanel: PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default enhance(ClubLayout);
