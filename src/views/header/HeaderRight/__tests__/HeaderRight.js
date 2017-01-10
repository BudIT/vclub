/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import React from 'react';
import updeep from 'updeep';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import createStoreProvider from 'vclub/utils/test-utils/createStoreProvider';

import initialState from 'vclub/redux/initialClubState';

import { toggleMemberPanel } from 'vclub/redux/club/ui';
import { logOut } from 'vclub/redux/club/auth';

import HeaderRight, { HeaderRightComponent } from '../HeaderRight';


const user = {
  id: '1',
  name: 'User',
  master: true,
};

const numberOfMembers = 5;

const userState = updeep({
  auth: { user },
}, initialState);

test('<HeaderRight /> renders correctly', () => {
  const wrapper = shallow(
    <HeaderRightComponent
      numberOfMembers={numberOfMembers}
      showMemberPanel={false}
      user={user}
      dispatch={jest.fn()}
      onLogOut={jest.fn()}
      onToggleMemberPanel={jest.fn()}
    />
  );

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('HeaderRight dispatch toggleMemberPanel action on click', () => {
  const { StoreProvider, dispatch } = createStoreProvider(userState);

  const wrapper = mount((
    <StoreProvider>
      <HeaderRight
        numberOfMembers={numberOfMembers}
        showMemberPanel={false}
        user={user}
        dispatch={dispatch}
      />
    </StoreProvider>
  ));

  const buttonToggleMemberPanel = wrapper.find('button').at(2);
  buttonToggleMemberPanel.simulate('click');

  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(toggleMemberPanel());
});

test('HeaderRight dispatch logOut action on click', () => {
  const { StoreProvider, dispatch } = createStoreProvider(userState);

  const wrapper = mount(
    <StoreProvider>
      <HeaderRight
        numberOfMembers={numberOfMembers}
        showMemberPanel={false}
        user={user}
        dispatch={dispatch}
      />
    </StoreProvider>
  );

  const buttonLogOut = wrapper.find('div.dropdownContent > button');
  buttonLogOut.simulate('click');

  const expectedAction = logOut();

  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch.mock.calls[0][0].type).toBe(expectedAction.type);
});
