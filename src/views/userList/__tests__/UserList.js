/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import UserList from '../UserList';

const usersWithFewMasters = [
  { id: 0, name: 'Misato', master: false },
  { id: 1, name: 'Simon', master: false },
  { id: 2, name: 'Jack London', master: true },
  { id: 3, name: 'Master', master: true },
  { id: 4, name: 'And another master', master: true },
  { id: 5, name: 'Not master', master: false },
  { id: 6, name: 'Harry West', master: false },
];

test('<UserList /> renders correctly', () => {
  const rendered = mount(
    <UserList members={usersWithFewMasters} />
  );
  expect(rendered.html()).toMatchSnapshot();
});
