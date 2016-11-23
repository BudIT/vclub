/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import initialState from 'vclub/redux/initialClubState';
import ChatRoom from 'vclub/views/chatRoom/ChatRoom';


const messages = [
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
];

const book = storiesOf('ChatRoom', module);

book.setInitialState(initialState);

book.addReduxStory('Initial state ChatRoom', dispatch => (
  <ChatRoom dispatch={dispatch} />
  ), {
    messages,
  }
);

