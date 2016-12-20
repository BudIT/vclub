/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import initialState from 'vclub/redux/initialClubState';
import ChatRoom from 'vclub/views/chatRoom/ChatRoom';

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
        id: 1,
        author: 'Yanis',
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
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
        id: 1,
        author: 'Yanis',
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        message: 'hello',
      },
      {
        id: 2,
        author: 'Den',
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        message: 'hello!',
      },
      {
        id: 3,
        author: 'Vira',
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
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

