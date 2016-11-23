import initialState from 'vclub/redux/initialClubState';

export const GET_MESSAGES = 'club/chat/get-messages';

export function getMessages() {
  return {
    type: GET_MESSAGES,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: state.chat.messages,
      };
    default:
      return state || initialState.chat;
  }
}
