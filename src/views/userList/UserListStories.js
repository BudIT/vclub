/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserList from './UserList';

const users = [
  { id: 0, name: 'Misato', master: false },
  { id: 1, name: 'Simon', master: false },
  { id: 2, name: 'Jack London', master: false },
  { id: 3, name: '綾波レイ', master: false },
];

const usersWithMaster = [
  { id: 0, name: 'Misato', master: false },
  { id: 1, name: 'Simon', master: false },
  { id: 2, name: 'Jack London', master: true },
  { id: 3, name: '綾波レイ', master: false },
];

storiesOf('UserList', module)
  .addDecorator((story) => (
    <div>
      {story()}
    </div>
  ))
  .add('without props', () => (<UserList members={[]} />))
  .add('with users', () => (<UserList members={users} />))
  .add('with users and masters', () => (<UserList members={usersWithMaster} />));
