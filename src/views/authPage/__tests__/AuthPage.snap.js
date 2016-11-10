/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import { AuthPage } from '../AuthPage';

test('<AuthPage /> component renders correctly', () => {
  // const store = createStore(() => ({}));
  const shallowRenderer = ReactTestUtils.createRenderer();

  shallowRenderer.render(
    <AuthPage handleSubmit={jest.fn()} />
  );
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});
