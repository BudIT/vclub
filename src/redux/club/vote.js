import createReducer from 'borex-reducers/createReducer';
import actionCreator from 'borex-actions/actionCreator';
import setMetaStatic from 'borex-actions/setMetaStatic';
// import appendIn from 'borex-reducers/appendIn';

import initialState from 'vclub/redux/initialClubState';


function appendUniq(key) {
  return (state, action) => {
    const { pros, cons } = state;
    const userId = action.payload;

    if (pros.includes(userId) || cons.includes(userId)) {
      return state;
    }

    return {
      ...state,
      [key]: [...state[key], userId],
    };
  };
}

export const toggleModal = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const like = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export const dislike = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export default createReducer((on) => {
  on(toggleModal, (state) => {
    if (state.showModalVote === true) return initialState.vote;
    return {
      ...state,
      showModalVote: !state.showModalVote,
    };
  });
  on(like, appendUniq('pros'));
  on(dislike, appendUniq('cons'));
});
