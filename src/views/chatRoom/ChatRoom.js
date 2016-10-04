import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

const enhance = compose(
  connect(state => ({ state })),
);

function ChatRoom() {
  return (
    <div>
      <h1>
        Chat Room
      </h1>
    </div>
  );
}

export default enhance(ChatRoom);
