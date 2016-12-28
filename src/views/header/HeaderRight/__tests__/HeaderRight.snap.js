/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import HeaderRight from '../HeaderRight';


const numberOfMembers = 5;

const user = {
  id: '1',
  name: 'User',
  master: true,
};

test('<HeaderRight /> renders correctly', () => {
  const dispatchSpy = jest.fn();
  const rendered = renderer.create(
    <HeaderRight
      numberOfMembers={numberOfMembers}
      user={user}
      dispatch={dispatchSpy}
    />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
