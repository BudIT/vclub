import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

const currentRoomName = 'VIDEO';
const numberOfMembers = 5;

test('<Header /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <Header
      currentRoomName={currentRoomName}
      numberOfMembers={numberOfMembers}
      dispatch={dispatchSpy}
    />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
