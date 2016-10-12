import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

const enhance = compose(
  connect(state => ({ state })),
);

function VideoRoom() {
  return (
    <div>
      <h1>
        Video Room
      </h1>
    </div>
  );
}

export default enhance(VideoRoom);
