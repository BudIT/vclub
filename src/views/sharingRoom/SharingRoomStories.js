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
    auth: {
      user: members[0],
    },
    members,
    sharingRoom: {
      completesSession: members[0].master,
    },
  }
);

book.addReduxStory('First user has a ball', dispatch => (
  <SharingRoom dispatch={dispatch} />
  ), {
    auth: {
      user: members[1],
    },
    members,
    sharingRoom: {
      ballPosition: members[0].id,
    },
  });

book.addReduxStory('User has a label completed', dispatch => (
  <SharingRoom dispatch={dispatch} />
), {
  auth: {
    user: members[1],
  },
  members,
  sharingRoom: {
    done: [members[0].id, members[3].id],
  },
});

book.addReduxStory('Shows the menu "Pass ball"', dispatch => (
  <SharingRoom dispatch={dispatch} />
), {
  auth: {
    user: members[1],
  },
  members,
  sharingRoom: {
    ballPosition: members[1].id,
    userMenuPosition: members[5].id,
  },
});

book.addReduxStory('The time limit has expired', dispatch => (
  <SharingRoom dispatch={dispatch} />
), {
  auth: {
    user: members[1],
  },
  members,
  sharingRoom: {
    ballPosition: members[1].id,
    done: [members[0].id, members[3].id],
    timerStart: Date.now() - 300000,
  },
});

book.addReduxStory('Shows the menu "Completes session"', dispatch => (
  <SharingRoom dispatch={dispatch} />
), {
  auth: {
    user: members[1],
  },
  members,
  sharingRoom: {
    ballPosition: members[1].id,
    showBallMenu: true,
  },
});
