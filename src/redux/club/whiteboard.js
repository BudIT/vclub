import R from 'ramda';

import initialState from 'vclub/redux/initialClubState';

// adding figures
export const ADD_NEW_FIGURE = 'club/whiteboard/add-new-figure';
export const CHOOSE_FIGURE = 'club/whiteboard/choose-figure';

export function addNewFigure(figure) {
  console.log("ADD NEW FIGURE");
  return {
    type: ADD_NEW_FIGURE,
    payload: {
      figure,
    },
  };
}

export function chooseFigure(figureNumber) {
  return {
    type: CHOOSE_FIGURE,
    payload: {
      figureNumber,
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
    case CHOOSE_FIGURE:
      return {
        ...state,
        currentFigure: action.payload.figureNumber,
      };
    default:
      return state || initialState.whiteboard;
  }
}
