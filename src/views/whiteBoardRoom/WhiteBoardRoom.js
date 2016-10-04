import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

const enhance = compose(
  connect(state => ({ state })),
);

function WhiteBoardRoom() {
  return (
    <div>
      <h1>
        WhiteBoard Room
      </h1>
    </div>
  );
}

export default enhance(WhiteBoardRoom);
