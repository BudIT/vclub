/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

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
  const wrapper = shallow(
    <HeaderLeft
      currentRoomName={currentRoomName}
      roomsNames={roomsNames}
      user={user}
      dispatch={dispatchSpy}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
