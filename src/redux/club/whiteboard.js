import R from 'ramda';

import initialState from 'vclub/redux/initialClubState';

// adding figures
export const ADD_NEW_FIGURE = 'club/whiteboard/add-new-figure';

export function addNewFigure(figure) {
  return {
    type: ADD_NEW_FIGURE,
    payload: {
      figure,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_NEW_FIGURE:
      return {
        ...state,
        figures: R.concat(state.figures, [
          action.payload.figure,
        ]),
      };
    default:
      return state || initialState.whiteboard;
  }
}
