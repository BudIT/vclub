/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import HeaderLeft from '../HeaderLeft';

const roomsNames = ['SHARING', 'VIDEO', 'CHAT', 'WHITEBOARD'];
const currentRoomName = 'VIDEO';

const user = {
  id: '1',
  name: 'User',
  master: true,
};

test('<HeaderLeft /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderLeft
      currentRoomName={currentRoomName}
      roomsNames={roomsNames}
      user={user}
      dispatch={dispatchSpy}
    />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
