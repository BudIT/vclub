import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ClubLayout from 'vclub/views/clubLayout/Container';
import clubReducer from 'vclub/reducers/club';


const book = storiesOf('views.clubLayout.ClubLayout', module);

book.setInitialStateFromReducer(clubReducer);

book.addReduxStory('Default', dispatch => (
  <ClubLayout n="nn" dispatch={dispatch} />
));

book.addReduxStory('Default2', dispatch => (
  <ClubLayout n="n" dispatch={dispatch} />
));
