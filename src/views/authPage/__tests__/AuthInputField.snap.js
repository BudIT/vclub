/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
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

test('<AuthInputField /> renders correctly when touched is false', () => {
  const props = createProps(false, 'some error');
  const wrapper = shallow(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('<AuthInputField /> renders correctly when touched is true', () => {
  const props = createProps(true, undefined);
  const wrapper = shallow(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('<AuthInputField /> renders correctly when error happens', () => {
  const props = createProps(true, 'some error');
  const wrapper = shallow(
    <AuthInputField
      {...props}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
