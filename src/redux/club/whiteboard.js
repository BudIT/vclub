import initialState from 'vclub/redux/initialClubState';

// adding figures
export const ADD_NEW_FIGURE = 'club/whiteboard/add-new-figure';

export function addNewFigure(figure) {
  return {
    type: ADD_NEW_FIGURE,
    payload: {
      figure,
    },
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_NEW_FIGURE:
      return {
        ...state,
        figures: [...state.figures, action.payload.figure],
      };
    default:
      return state || initialState.whiteboard;
  }
}
