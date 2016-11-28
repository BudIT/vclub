import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import { sendMessage } from 'vclub/redux/club/chat';


const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
  })),
  withHandlers({
    onButtonClick: (props) => (message) => {
      console.log(123, message);
      props.dispatch(sendMessage(message));
    },
  }),
);

function InputBox(props) {
  const { onButtonClick } = props;
  const yoba = {
        id: Date.now(),
        author: 'Yanis',
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        message: 'hello',
      }
  return (
    <section>
      <input type="text" name="message" />
      <button onClick={() => onButtonClick(yoba)} type="submit">Send message</button>
    </section>
  );
}
/* eslint-disable */
InputBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
/* eslint-enable */

export default enhance(InputBox);
