import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import format from 'date-fns/format';
import compose from 'recompose/compose';
import { connect } from 'react-redux';


const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
  })),
      reduxForm({
        form: 'chatMessage',
        initialValues: {
          id: Date.now(),
          author: '',
          date: format(Date.now(), 'HH:mm'),
          message: '',
        },
      }),
);

function InputBox(props) {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="message" component="input" type="text" placeholder="message" />
      </div>
      <button type="submit">Send</button>
    </form>
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
  handleSubmit: PropTypes.func.isRequired,
};
/* eslint-enable */

export default enhance(InputBox);
