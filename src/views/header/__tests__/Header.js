/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { HeaderComponent } from '../Header';


const currentRoomName = 'VIDEO';
const numberOfMembers = 5;

const user = {
  id: '1',
  name: 'User',
  master: true,
};

test('<Header /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const wrapper = shallow(
    <HeaderComponent
      currentRoomName={currentRoomName}
      numberOfMembers={numberOfMembers}
      user={user}
      dispatch={dispatchSpy}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
