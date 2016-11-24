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
  members: [
    { id: 0, name: 'Yanis', master: false },
  ],
  chat: {
    messages: [
      { id: 1,
        author: 'Yanis',
        message: 'hello',
      },
    ],
  },
});

book.addReduxStory('More messages', dispatch => (
  <ChatRoom dispatch={dispatch} />
), {
  members: [
  { id: 0, name: 'Yanis', master: false },
  { id: 1, name: 'Vira', master: false },
  { id: 2, name: 'Den', master: true },
  ],
  chat: {
    messages: [
      { id: 1,
        author: 'Yanis',
        message: 'hello',
      },
      { id: 2,
        author: 'Den',
        message: 'hello!',
      },
      { id: 3,
        author: 'Vira',
        message: 'hello!!!',
      },
    ],
  },
});

book.addReduxStory('No messages', dispatch => (
  <ChatRoom dispatch={dispatch} />
  ), {
    chat: {
      messages: [],
    } },
);

