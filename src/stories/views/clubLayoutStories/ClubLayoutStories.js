import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ClubLayout from 'vclub/views/clubLayout/ClubLayout';
import clubReducer from 'vclub/reducers/club';


const book = storiesOf('views.clubLayout.ClubLayout', module);

book.setInitialStateFromReducer(clubReducer);

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
