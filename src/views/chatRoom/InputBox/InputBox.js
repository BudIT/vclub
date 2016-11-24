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
    onButtonClick: (props) => () => {
      const { dispatch } = props;
      console.log(props);
      dispatch(sendMessage);
    },
  }),
);

function InputBox(props) {
  const { messages, onButtonClick } = props;
  return (
    <section>
      <input type="text" name="message" />
      <button onClick={onButtonClick} type="submit">Send message</button>
    </section>
  );
}

InputBox.propTypes = {
  messages: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default enhance(InputBox);
