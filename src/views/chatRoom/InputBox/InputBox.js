import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import style from './InputBox.css';


const enhance = compose(
  connect(state => ({
    messages: state.chat.messages,
    username: state.auth.user.name,
  })),
      reduxForm({
        form: 'chatMessage',
        initialValues: {
          message: '',
        },
      }),
);

function InputBox(props) {
  const { handleSubmit, pristine, submitting, username, styles } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="message"
          component="input"
          type="text"
          placeholder="message"
          className={style.input}
        />
      </div>
      <button type="submit" disabled={submitting || pristine} className={style.send}>Send</button>
      <div className={style.icon}>
        <span className={styles.pic}>
          <i className={styles.char}>{username.charAt(0)}</i>
        </span>
      </div>
    </form>
  );
}

/* eslint-disable */
InputBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};
/* eslint-enable */

export default enhance(InputBox);
