import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ClubLayout from 'vclub/views/clubLayout/ClubLayout';
import initialState from 'vclub/redux/initialState';


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
