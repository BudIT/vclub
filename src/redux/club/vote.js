import initialState from 'vclub/redux/initialClubState';

export const TOGGLE_MODAL = 'club/vote/toggle-modal';
export const LIKE = 'club/vote/on-like-click';
export const DISLIKE = 'club/vote/on-dislike-click';


export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export function like(userId) {
  return {
    type: LIKE,
    payload: userId,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export function dislike(userId) {
  return {
    type: DISLIKE,
    payload: userId,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      if (state.showModalVote === true) {
        return initialState.vote;
      }
      return {
        ...state,
        showModalVote: !state.showModalVote,
      };
    case LIKE:
      return {
        ...state,
        pros: [...state.pros, action.payload],
      };
    case DISLIKE:
      return {
        ...state,
        cons: [...state.cons, action.payload],
      };
    default:
      return state || initialState.vote;
  }
}
