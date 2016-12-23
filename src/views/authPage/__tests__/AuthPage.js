/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { auth } from 'vclub/redux/club/auth';

import AuthPageContainer, { AuthPageComponent } from '../AuthPage';

function createPage(subject) {
  return {
    usernameField: () => subject.find('.input_name'),
    form: () => subject.find('.login'),
    errorBlock: () => subject.find('.errors'),
  };
}

const setTextToInputThenBlur = (page, text) => {
  const input = page.usernameField();
  input.simulate('focus');
  input.node.value = text;
  input.simulate('blur');
};

describe('<AuthPage /> container', () => {
  let store;
  let subject;
  let page;
  const dispatchSpy = jest.fn();

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    subject = mount(
      <Provider store={store}>
        <AuthPageContainer dispatch={dispatchSpy} />
      </Provider>
    );
    page = createPage(subject);
  });

  it('shows help text when first name is set to blank', () => {
    setTextToInputThenBlur(page, '');
    expect(page.errorBlock().text()).toBe('Пожалуйста, введите Ваше имя !!!');
  });

  it('shows help text when username is too long', () => {
    setTextToInputThenBlur(page, 'DenisViraBogdanYanisVeryVeryLongName');
    expect(page.errorBlock().text()).toBe('Имя должно быть 15 символов или меньше');
  });

  it('shows nothing when username field is correctly filled', () => {
    setTextToInputThenBlur(page, 'Zeus');
    expect(page.errorBlock().length).toBe(0);
  });

  it('calls onSubmit when the form is filled correctly', () => {
    const expectedAction = auth();

    setTextToInputThenBlur(page, 'Zeus');
    page.form().simulate('submit');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0].type).toBe(expectedAction.type);
  });
});

test('<AuthPage /> component renders correctly', () => {
  // const store = createStore(() => ({}));

  const wrapper = shallow(
    <AuthPageComponent handleSubmit={jest.fn()} />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
