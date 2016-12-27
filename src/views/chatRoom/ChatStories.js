/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import initialState from 'vclub/redux/initialClubState';
import ChatRoom from 'vclub/views/chatRoom/ChatRoom';
import uuid from 'uuid';
import moment from 'moment';

const book = storiesOf('ChatRoom', module);

book.setInitialState(initialState);

book.addReduxStory('InitialState ChatRoom', dispatch => (
  <ChatRoom dispatch={dispatch} />
), {
  auth: {
    user: {
      name: 'Test Name',
    },
  },
  chat: {
    messages: [
      {
        id: uuid.v4(),
        user: 'Yanis',
        date: moment.utc(),
        message: 'hello',
      },
    ],
  },
});

book.addReduxStory('More messages', dispatch => (
  <ChatRoom dispatch={dispatch} />
), {
  auth: {
    user: {
      name: 'TestName',
    },
  },
  chat: {
    messages: [
      {
        id: uuid.v4(),
        user: 'Yanis',
        date: moment.utc(),
        message: 'hello',
      },
      {
        id: uuid.v4(),
        user: 'Den',
        date: moment.utc(),
        message: 'hello!',
      },
      {
        id: uuid.v4(),
        user: 'Vira',
        date: moment.utc(),
        message: 'hello!!!',
      },
    ],
  },
});

book.addReduxStory('No messages', dispatch => (
  <ChatRoom dispatch={dispatch} />
  ), {
    auth: {
      user: {
        name: 'TestName',
      },
    },
    chat: {
      messages: [],
    } },
);

