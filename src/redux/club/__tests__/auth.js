import {
  LOG_OUT, logOut,
  AUTH, auth,
} from '../auth'

import reducer from '../auth'
import initialState from 'vclub/redux/initialClubState'

// action creator
test('logOut action creator creates proper action', () => {
  const nextRoom = 'CHAT'
  const expectedAction = {
    type: LOG_OUT,
    meta: {
      sideEffect: () => {}
    },
  }
  const action = logOut()
  expect(action.type).toEqual(expectedAction.type)

  const ioSocket = {
    emit: jest.fn(),
  };

  action.meta.sideEffect({ ioSocket })

  expect(ioSocket.emit).toHaveBeenCalledWith('logOut')
  expect(ioSocket.emit).toHaveBeenCalledTimes(1)
})

// reducer
test('reducer returns initial state', () => {
  const { auth: authInitialState } = initialState
  expect(reducer(undefined, {}))
    .toEqual(authInitialState)
})
