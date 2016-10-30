/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import initialState from 'vclub/redux/initialClubState';

import SharingRoom from 'vclub/views/sharingRoom/SharingRoom';


const members = [
  {
    id: '1',
    name: 'Моника',
    master: true,
  },
  {
    id: '2',
    name: 'Росс',
    master: false,
  },
  {
    id: '3',
    name: 'Фиби',
    master: false,
  },
  {
    id: '4',
    name: 'Рейчел',
    master: false,
  },
  {
    id: '5',
    name: 'Джоуи',
    master: false,
  },
  {
    id: '6',
    name: 'Чендлер',
    master: false,
  },
];


const book = storiesOf('SharingRoom', module);

book.setInitialState(initialState);

book.addReduxStory('Initial state SharingRoom', dispatch => (
  <SharingRoom dispatch={dispatch} />
  ), {
    members,
  }
);

book.addReduxStory('A ball in the first user', dispatch => (
  <SharingRoom dispatch={dispatch} />
  ), {
    members,
    sharingRoom: {
      ballPosition: members[0].id,
    },
  });

book.addReduxStory('A user with the label done', dispatch => (
  <SharingRoom dispatch={dispatch} />
), {
  members,
  sharingRoom: {
    ballPosition: members[1].id,
    done: [members[0].id, members[3].id],
  },
});
