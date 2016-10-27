import { TOGGLE_MEMBER_PANEL, toggleMemberPanel } from '../ui'
import reducer from '../ui'
import initialState from 'vclub/redux/initialClubState'

// action creator
test('toggleMemberPanel action creates proper action', () => {
  const expectedAction = {
    type: TOGGLE_MEMBER_PANEL,
  }
  expect(toggleMemberPanel()).toEqual(expectedAction)
})

// reducer
test('reducer returns initial state', () => {
  const { ui: uiInitialState } = initialState
  expect(reducer(undefined, {}))
    .toEqual(uiInitialState)
})

test('reducer should handle TOGGLE_MEMBER_PANEL', () => {
  const { rooms: uiInitialState } = initialState

  const expectedState = {
    ...uiInitialState,
    showMemberPanel: !uiInitialState.showMemberPanel,
  }

  expect(reducer(uiInitialState, toggleMemberPanel())).toEqual(expectedState)
})
