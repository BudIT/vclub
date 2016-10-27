import React from 'react';
import renderer from 'react-test-renderer';
import HeaderRight from '../HeaderRight';

const numberOfMembers = 5;

test('<HeaderRight /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderRight
      numberOfMembers={numberOfMembers}
      dispatch={dispatchSpy}
    />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
