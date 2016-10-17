import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import AuthedLayout from 'vclub/views/authedLayout/AuthedLayout';
import AuthPage from 'vclub/views/authPage/AuthPage';

const enhance = compose(
  connect(state => ({
    authenticated: state.auth.authenticated,
    currentRoom: state.rooms.currentRoom,
  })),
);

function ClubLayout(props) {
  const {
    authenticated, currentRoom, dispatch,
  } = props;

  return (
    <div>
      <main>
        {authenticated === false
          ? <AuthPage dispatch={dispatch} />
          : <AuthedLayout currentRoom={currentRoom} />
        }
      </main>
    </div>
  );
}

ClubLayout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentRoom: PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default enhance(ClubLayout);
