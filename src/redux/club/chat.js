import initialState from 'vclub/redux/initialClubState';

export const GET_MESSAGES = 'club/chat/get-messages';
export const SEND_MESSAGE = 'club/chat/send-message';

export function getMessages(messages) {
  return {
    type: GET_MESSAGES,
    payload: messages,
  };
}

export function sendMessages(messages) {
  console.log(123, messages)
  return {
    type: SEND_MESSAGE,
    payload: messages,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        messages: state.chat.messages,
      };
    case SEND_MESSAGE:
      return [...state, action.payload];
    default:
      return state || initialState.chat;
  }
}
