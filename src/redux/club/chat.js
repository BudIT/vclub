import initialState from 'vclub/redux/initialClubState';

export const SEND_MESSAGE = 'club/chat/send-message';

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
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload],
      };
    default:
      return state || initialState.chat;
  }
}
