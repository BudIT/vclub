import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';


const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
  })),
      reduxForm({
        form: 'chatMessage',
        initialValues: {
          message: '',
        },
      }),
);

function InputBox(props) {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="message" component="input" type="text" placeholder="message" />
      </div>
      <button type="submit" disabled={submitting || pristine}>Send</button>
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
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
/* eslint-enable */

export default enhance(InputBox);
