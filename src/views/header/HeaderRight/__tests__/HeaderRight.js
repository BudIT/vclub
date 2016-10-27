/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
// jest.mock('react/lib/ReactDefaultInjection')

import React from 'react';
import { mount, shallow } from 'enzyme';
import { toggleMemberPanel } from 'vclub/redux/club/ui'
import { logOut } from 'vclub/redux/club/auth'
import HeaderRight from '../HeaderRight';

const numberOfMembers = 5;

test('HeaderRight calls passed function on click', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderRight
      numberOfMembers={numberOfMembers}
      dispatch={dispatchSpy}
    />
  );

  const buttonToggleMemberPanel = wrapper.find('button').first();
  buttonToggleMemberPanel.simulate('click');

  const buttonLogOut = wrapper.find('div.dropdownContent > button')
  buttonLogOut.simulate('click')

  expect(true).toBe(true)
  expect(dispatchSpy).toHaveBeenCalledTimes(2);
  // expect(dispatchSpy).toHaveBeenCalledWith(toggleMemberPanel(), logOut());
});
