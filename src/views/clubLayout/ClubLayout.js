import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import NavLink from 'vclub/components/NavLink/NavLink';
import Nav from 'vclub/components/Nav/Nav';


const enhance = compose(
  connect(state => ({ state })),
);

function ClubLayout() {
  return (
    <div>
      <header>
        <Nav>
          <NavLink>Sharing</NavLink>
          <NavLink>Video</NavLink>
          <NavLink>Chat</NavLink>
          <NavLink>Whiteboard</NavLink>
          <NavLink>Menu</NavLink>
        </Nav>
      </header>
      <main>
        Content will be there
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default enhance(ClubLayout);
