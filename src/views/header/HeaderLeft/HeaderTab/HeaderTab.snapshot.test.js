import React from 'react';
import renderer from 'react-test-renderer';
import HeaderTab from './HeaderTab';

const tabName = 'VIDEO';

test('<HeaderTab /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderTab isCurrentTab dispatch={dispatchSpy}>
      {tabName}
    </HeaderTab>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
