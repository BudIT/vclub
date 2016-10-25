/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import initialState from 'vclub/redux/initialClubState';

import SharingRoom from 'vclub/views/sharingRoom/SharingRoom';


const book = storiesOf('SharingRoom', module);

book.setInitialState(initialState);

book.addReduxStory('SharingRoom', dispatch => (
  <SharingRoom dispatch={dispatch} />
));

book.addReduxStory('GiveABall', dispatch => (
  <div>
    <SharingRoom dispatch={dispatch} />
    <div>
      <button id="1">Моника</button>
      <button onClick={action('clicked')}>&#9918;</button>
    </div>
  </div>
));

