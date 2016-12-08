import initialState from 'vclub/redux/initialClubState';

export const GET_MESSAGES = 'club/chat/get-messages';
export const SEND_MESSAGE = 'club/chat/send-message';

export function getMessages() {
  return {
    type: GET_MESSAGES,
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: message,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        messages: state.chat.messages,
      };
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload],
      };
    default:
      return state || initialState.chat;
  }
}
