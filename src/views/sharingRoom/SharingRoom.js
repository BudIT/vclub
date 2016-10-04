import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

const enhance = compose(
  connect(state => ({ state })),
);

function SharingRoom() {
  return (
    <div>
      <h1>
        Sharing Room
      </h1>
    </div>
  );
}

export default enhance(SharingRoom);
