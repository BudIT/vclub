/* eslint-env jest */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


export default function createStoreProvider(state) {
  let currentState = state;
  const dispatchSpy = jest.fn();
  const store = createStore(s => s, state);

  const mockedStore = {
    ...store,
    dispatch: dispatchSpy,
    getState: () => currentState,
  };

  return {
    // eslint-disable-next-line react/prop-types
    StoreProvider({ children }) {
      return <Provider store={mockedStore}>{children}</Provider>;
    },
    dispatch: dispatchSpy,
    setState(newState) {
      currentState = newState;
    },
  };
}
