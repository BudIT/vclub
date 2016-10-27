/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */
// jest.mock('react/lib/ReactDefaultInjection')

import { changeRoom } from 'vclub/redux/club/rooms';

import React from 'react';
import { mount, shallow } from 'enzyme';
import HeaderTab from '../HeaderTab';

const tabName = 'VIDEO';

test('HeaderTab calls passed function when HeaderTab is clicked', () => {
  const dispatchSpy = jest.fn();
  const wrapper = mount(
    <HeaderTab isCurrentTab dispatch={dispatchSpy}>
      {tabName}
    </HeaderTab>
  );

  const button = wrapper.find('button');
  button.simulate('click');
  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy).toHaveBeenCalledWith(changeRoom(tabName));
});
