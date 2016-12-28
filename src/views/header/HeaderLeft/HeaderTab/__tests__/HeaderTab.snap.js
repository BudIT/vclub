/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import HeaderTab from '../HeaderTab';

const tabName = 'VIDEO';

const user = {
  id: '1',
  name: 'User',
  master: true,
};

test('<HeaderTab /> (current tab) renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderTab
      isCurrentTab
      user={user}
      dispatch={dispatchSpy}
    >
      {tabName}
    </HeaderTab>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

test('<HeaderTab /> (not current tab) renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderTab
      isCurrentTab={false}
      user={user}
      dispatch={dispatchSpy}
    >
      {tabName}
    </HeaderTab>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
