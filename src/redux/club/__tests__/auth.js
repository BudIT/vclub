/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import initialState from 'vclub/redux/initialClubState';

import reducer, {
  LOG_OUT, logOut,
  AUTH, auth,
} from '../auth';

// action creator
// logOut
test('logOut action creator creates proper action', () => {
  const action = logOut();

  expect(action.type).toEqual(LOG_OUT);
  expect(action.meta.sideEffect).toBeDefined();
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

  action.meta.sideEffect({
    ioSocket,
    localStorage,
  });

  expect(ioSocket.emit).toHaveBeenCalledWith('logOut');
  expect(ioSocket.emit).toHaveBeenCalledTimes(1);

  expect(localStorage.removeItem).toHaveBeenCalledWith('name');
  expect(localStorage.removeItem).toHaveBeenCalledWith('master');
  expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
});

test('reducer with logOut works correctly', () => {
  // after logOut fired state must become initial
  const state = {
    ...initialState.auth,
    authenticated: true,
    user: {
      id: '1',
      name: 'Yanis',
      master: false,
    },
  };

  const action = logOut();

  expect(reducer(state, action)).toEqual(initialState.auth);
});

// auth
test('auth action creator creates proper action', () => {
  const action = auth({
    name: 'test',
    master: true,
  }, false);

  expect(action.type).toEqual(AUTH);
  expect(action.payload.name).toBeDefined();
  expect(action.payload.master).toBeDefined();
  expect(action.meta.sideEffect).toBeDefined();
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

  action.meta.sideEffect({
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

  action.meta.sideEffect({
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


// reducer
test('reducer returns initial state', () => {
  const { auth: authInitialState } = initialState;
  expect(reducer(undefined, {}))
    .toEqual(authInitialState);
});
