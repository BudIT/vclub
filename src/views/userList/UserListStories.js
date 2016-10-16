/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import initialState from 'vclub/redux/initialClubState';

import UserList from 'vclub/views/userList/UserList';

const book = storiesOf('views.userList.UserList', module);

book.setInitialState(initialState);

book.addReduxStory('UserList', dispatch => (
  <UserList dispatch={dispatch} />
));

book.addReduxStory('UserListMoreMembers', dispatch => (
  <UserList dispatch={dispatch} />
), {
    members: [{ id: 0, name: 'Goshan' }],
  });
