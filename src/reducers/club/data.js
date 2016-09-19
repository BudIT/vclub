import { AUTH } from 'vclub/constants/actionTypes';


const InitialData = {
  authenticated: false,
  authenticating: false,
  currentRoom: 'chat',
};

export default function dataReducer(state = InitialData, action) {
  if (action.type === AUTH) {
    return {
      ...state,
      authenticating: true,
    };
  }

  return state;
}
