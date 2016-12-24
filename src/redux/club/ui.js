import initialState from 'vclub/redux/initialClubState';

export const TOGGLE_MEMBER_PANEL = 'club/ui/toggle-member-panel';
export const OPEN_DIALOG = 'club/ua/open-dialog';

export function toggleMemberPanel() {
  return {
    type: TOGGLE_MEMBER_PANEL,
  };
}

export function openDialog() {
  return {
    type: OPEN_DIALOG,
  };
}

export function closeDialog() {
  return {
    type: OPEN_DIALOG,
  };
}


export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_MEMBER_PANEL:
      return {
        ...state,
        showMemberPanel: !state.showMemberPanel,
      };
    case OPEN_DIALOG:
      return {
        ...state,
        visibleDialog: state.visibleDialog,
      };
    default:
      return state || initialState.ui;
  }
}
