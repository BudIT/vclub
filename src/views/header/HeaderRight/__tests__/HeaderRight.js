/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import { toggleMemberPanel } from 'vclub/redux/club/ui';
import { logOut } from 'vclub/redux/club/auth';
import HeaderRight from '../HeaderRight';

const numberOfMembers = 5;

test('HeaderRight dispatch toggleMemberPanel action on click', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderRight
      numberOfMembers={numberOfMembers}
      dispatch={dispatchSpy}
    />
  );

  const buttonToggleMemberPanel = wrapper.find('button').first();
  buttonToggleMemberPanel.simulate('click');

  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy).toHaveBeenCalledWith(toggleMemberPanel());
});

test('HeaderRight dispatch logOut action on click', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderRight
      numberOfMembers={numberOfMembers}
      dispatch={dispatchSpy}
    />
  );

  const buttonLogOut = wrapper.find('div.dropdownContent > button');
  buttonLogOut.simulate('click');

  const expectedAction = logOut();

  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy.mock.calls[0][0].type).toBe(expectedAction.type);
});
