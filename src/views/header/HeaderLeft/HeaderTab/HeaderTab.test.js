/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import HeaderTab from './HeaderTab';

const tabName = 'Chat';

test('<HeaderTab /> renders correctly', () => {
  const wrapper = shallow(
    <HeaderTab>{tabName}</HeaderTab>
  );

  expect(wrapper.find('li').text().trim(), tabName);
});
