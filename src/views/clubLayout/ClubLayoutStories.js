/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import initialState from 'vclub/redux/initialState';
import ClubLayout from './ClubLayout';


const book = storiesOf('views.clubLayout.ClubLayout', module);

book.setInitialState(initialState.club);

book.addReduxStory('Default', dispatch => (
  <ClubLayout dispatch={dispatch} />
));

book.addReduxStory('Default2', dispatch => (
  <ClubLayout dispatch={dispatch} />
), {
  data: {
    authenticated: true,
  },
});
