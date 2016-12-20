/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

// TODO: need setType (ask Den)
// initialState test?
//

import initialState from 'vclub/redux/initialClubState';
import reducer, {
  sendMessage,
} from '../chat';

// action creator
test('sendMessage action creator creates proper action', () => {
  const action = sendMessage();

  expect(action).toEqual(sendMessage());
});

test('reducer should handle sendMessage', () => {
  const { chat } = initialState;

  const newMessages =
    {
      id: 1,
      author: 'Test User',
      date: '',
      message: 'hello lads',
    };

  const expectedState = {
    chat: {
      messages: [...chat.messages, newMessages],
    },
  };

  expect(reducer(chat, sendMessage(newMessages))).toEqual(expectedState.chat);
});
