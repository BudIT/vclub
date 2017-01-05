/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
// jest.mock('react/lib/ReactDefaultInjection')

import { changeRoom } from 'vclub/redux/club/rooms';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import HeaderTab, { HeaderTabComponent } from '../HeaderTab';


const tabName = 'VIDEO';

const masterUser = {
  id: '1',
  name: 'User',
  master: true,
};

const justAMember = { ...masterUser, master: false };


test('<HeaderTab /> (current tab) renders correctly', () => {
  const wrapper = shallow(
    <HeaderTabComponent isCurrentTab onClick={jest.fn()}>
      {tabName}
    </HeaderTabComponent>
  );

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('<HeaderTab /> (not current tab) renders correctly', () => {
  const wrapper = shallow(
    <HeaderTabComponent isCurrentTab={false} onClick={jest.fn()}>
      {tabName}
    </HeaderTabComponent>
  );

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('HeaderTab dispatches action for master', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderTab isCurrentTab user={masterUser} dispatch={dispatchSpy}>
      {tabName}
    </HeaderTab>
  );

  const button = wrapper.find('button');
  button.simulate('click');
  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy).toHaveBeenCalledWith(changeRoom(tabName));
});

test('HeaderTab ignores click for member', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderTab isCurrentTab user={justAMember} dispatch={dispatchSpy}>
      {tabName}
    </HeaderTab>
  );

  const button = wrapper.find('button');
  button.simulate('click');
  expect(dispatchSpy).not.toBeCalled();
});
