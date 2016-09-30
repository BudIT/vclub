/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import initialState from 'vclub/redux/initialClubState';

import Header          from 'vclub/views/header/Header';

const book = storiesOf('views.header.Header', module);

book.setInitialState(initialState);

book.addReduxStory('Header', dispatch => (
  <Header dispatch={dispatch} />
));
