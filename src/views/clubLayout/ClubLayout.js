import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Header from '../header/Header';

const enhance = compose(
  connect(state => ({ state })),
);

function ClubLayout() {
  return (
    <div>
      <Header />
      <main>
        Content will be there
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default enhance(ClubLayout);
