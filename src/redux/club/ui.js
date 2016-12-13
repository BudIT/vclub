import initialState from 'vclub/redux/initialClubState';

export const TOGGLE_MEMBER_PANEL = 'club/ui/toggle-member-panel';

export function toggleMemberPanel() {
  return {
    type: TOGGLE_MEMBER_PANEL,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_MEMBER_PANEL:
      return {
        ...state,
        showMemberPanel: !state.showMemberPanel,
      };
    default:
      return state || initialState.ui;
  }
}
