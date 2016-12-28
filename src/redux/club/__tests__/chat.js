/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env jest */

import initialState from 'vclub/redux/initialClubState';
import uuid from 'uuid';
import reducer, {
  sendMessage,
} from '../chat';

test('reducer should handle sendMessage', () => {
  const { chat } = initialState;

  const newMessages =
    {
      id: uuid.v4(),
      user: 'Test User',
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
