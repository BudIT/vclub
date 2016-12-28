/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

const currentRoomName = 'VIDEO';
const numberOfMembers = 5;

jest.mock('react-redux', () => ({
  connect() {
    return elm => elm;
  },
}));

const user = {
  id: '1',
  name: 'User',
  master: true,
};

test('<Header /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <Header
      currentRoomName={currentRoomName}
      numberOfMembers={numberOfMembers}
      user={user}
      dispatch={dispatchSpy}
    />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
