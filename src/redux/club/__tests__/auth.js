/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import initialState from 'vclub/redux/initialClubState';

import reducer, { logOut, auth, restoreAuth } from '../auth';

// action creator
// logOut
test('logOut action creator creates proper action', () => {
  const action = logOut();

  expect(action).toMatchSnapshot();
});

test('logOut sideEffect works correctly', () => {
  const action = logOut();

  // mock for ioSocket
  const ioSocket = {
    emit: jest.fn(),
  };

  const localStorage = {
    removeItem: jest.fn(),
  };

  action.meta.sideEffects[0]({
    ioSocket,
    localStorage,
  });

  expect(localStorage.removeItem).toHaveBeenCalledWith('name');
  expect(localStorage.removeItem).toHaveBeenCalledWith('master');
  expect(localStorage.removeItem).toHaveBeenCalledTimes(2);

  // TODO document.location.reload ?
});

// auth
test('auth action creator creates proper action', () => {
  const action = auth({
    name: 'test',
    master: true,
  }, false);

  expect(action).toMatchSnapshot();
});

test('auth sideEffect works correctly with remember = true', () => {
  const action = auth({
    name: 'test',
    master: true,
  }, true);

  // mock for ioSocket
  const ioSocket = {
    emit: jest.fn(),
  };

  const localStorage = {
    setItem: jest.fn(),
  };

  action.meta.sideEffects[0]({
    ioSocket,
    localStorage,
  });

  expect(ioSocket.emit).toHaveBeenCalledWith('auth', action.payload);
  expect(ioSocket.emit).toHaveBeenCalledTimes(1);

  expect(localStorage.setItem).toHaveBeenCalledWith('name', action.payload.name);
  expect(localStorage.setItem).toHaveBeenCalledWith('master', action.payload.master);
  expect(localStorage.setItem).toHaveBeenCalledTimes(2);
});

test('auth sideEffect works correctly with remember = false', () => {
  const action = auth({
    name: 'test',
    master: true,
  }, false);

  // mock for ioSocket
  const ioSocket = {
    emit: jest.fn(),
  };

  const localStorage = {
    setItem: jest.fn(),
  };

  action.meta.sideEffects[0]({
    ioSocket,
    localStorage,
  });

  expect(ioSocket.emit).toHaveBeenCalledWith('auth', action.payload);
  expect(ioSocket.emit).toHaveBeenCalledTimes(1);

  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
});

test('reducer with auth works correctly', () => {
  // after logOut fired state must become initial
  const state = {
    ...initialState.auth,
    authenticating: false,
  };

  const action = auth();

  expect(reducer(state, action).authenticating).toEqual(true);
});

// restore auth
test('restoreAuth action creator creates proper action', () => {
  const action = restoreAuth();

  expect(action).toMatchSnapshot();
});

test('restoreAuth sideEffect works correctly when we already have name in localStorage', () => {
  const action = restoreAuth();
  const dispatch = jest.fn();

  const storage = {
    name: 'testName',
    master: true,
  };
  const localStorage = {
    getItem: jest.fn(elm => storage[elm]),
  };

  action.meta.sideEffects[0]({
    dispatch,
    localStorage,
  });

  expect(dispatch).toHaveBeenCalledTimes(1);

  expect(localStorage.getItem).toHaveBeenCalledWith('name');
  expect(localStorage.getItem).toHaveBeenCalledWith('master');
  expect(localStorage.getItem).toHaveBeenCalledTimes(2);
});

test('restoreAuth sideEffect works correctly when we haven\'t name in localStorage', () => {
  const action = restoreAuth();
  const dispatch = jest.fn();

  const localStorage = {
    getItem: jest.fn(() => null),
  };

  action.meta.sideEffects[0]({
    dispatch,
    localStorage,
  });

  expect(dispatch).not.toHaveBeenCalled();

  expect(localStorage.getItem).toHaveBeenCalledWith('name');
  expect(localStorage.getItem).toHaveBeenCalledWith('master');
  expect(localStorage.getItem).toHaveBeenCalledTimes(2);
});


// reducer
test('reducer returns initial state', () => {
  const { auth: authInitialState } = initialState;
  expect(reducer(undefined, {}))
    .toEqual(authInitialState);
});
