import {
  LOG_OUT, logOut,
  AUTH, auth,
} from '../auth'

import reducer from '../auth'
import initialState from 'vclub/redux/initialClubState'

// action creator
test('logOut action creator creates proper action', () => {
  const nextRoom = 'CHAT'
  const action = logOut()

  expect(action.type).toEqual(LOG_OUT)
  expect(action.meta.sideEffect).toBeDefined()
})

test('logOut sideEffect works correctly', () => {
  const action = logOut()

  const ioSocket = {
    emit: jest.fn(),
  };
  action.meta.sideEffect({ ioSocket })

  expect(ioSocket.emit).toHaveBeenCalledWith('logOut')
  expect(ioSocket.emit).toHaveBeenCalledTimes(1)
})

test('reducer with logOut works correctly', () => {
  // after logOut fired state must become initial
  const state = {
    ...initialState.auth,
    authenticated: true,
    user: {
      id: "1",
      name: "Yanis",
      master: false,
    }
  }

  const action = logOut()

  expect(reducer(state, action)).toEqual(initialState.auth)
})

// reducer
test('reducer returns initial state', () => {
  const { auth: authInitialState } = initialState
  expect(reducer(undefined, {}))
    .toEqual(authInitialState)
})
