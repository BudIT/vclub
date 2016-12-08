import initialState from 'vclub/redux/initialClubState';

export const TOGGLE_MEMBER_PANEL = 'club/ui/toggle-member-panel';
export const TURN_ON_MEMBER_PANEL = 'club/ui/turn-on-member-panel';

export function toggleMemberPanel() {
  return {
    type: TOGGLE_MEMBER_PANEL,
  };
}

export function turnOnMemberPanel() {
  return {
    type: TURN_ON_MEMBER_PANEL,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_MEMBER_PANEL:
      return {
        ...state,
        showMemberPanel: !state.showMemberPanel,
      };
    case TURN_ON_MEMBER_PANEL:
      return { 
        ...state,
        showMemberPanel: true,
      };
    default:
      return state || initialState.ui;
  }
}
