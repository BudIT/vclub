/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import AuthInputField from '../AuthInputField';

const createProps = (touched, error) => ({
  input: {},
  type: 'text',
  placeholder: 'placeholder',
  className: 'name',
  meta: {
    touched,
    error,
  },
});

const shallowRenderer = ReactTestUtils.createRenderer();

test('<AuthInputField /> renders correctly when touched is false', () => {
  const props = createProps(false, 'some error');
  shallowRenderer.render(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});

test('<AuthInputField /> renders correctly when touched is true', () => {
  const props = createProps(true, undefined);
  shallowRenderer.render(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});

test('<AuthInputField /> renders correctly #3', () => {
  const props = createProps(true, 'some error');
  shallowRenderer.render(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});
