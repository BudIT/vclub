import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import AuthedLayout from 'vclub/views/authedLayout/AuthedLayout';
import AuthPage from 'vclub/views/authPage/AuthPage';

const enhance = compose(
  connect(state => ({
    authenticated: state.auth.authenticated,
    currentRoom: state.ui.currentRoom,
  })),
);

function ClubLayout(props) {
  const {
    authenticated, currentRoom,
  } = props;

  return (
    <div>
      <main>
        {authenticated === false
          ? <AuthPage dispatch={props.dispatch} />
          : <AuthedLayout currentRoom={currentRoom} />
        }
      </main>
    </div>
  );
}

ClubLayout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentRoom: PropTypes.string.isRequired,
};

export default enhance(ClubLayout);
