const IS_SELECTED = 'club/sharing/is-select';

export function isSelected(memberName) {
  return {
    type: IS_SELECTED,
    payload: memberName,
  };
}
