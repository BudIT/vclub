import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styles from './InputBox.css';


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
  const { handleSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.container}>
        <div className={styles.inputCell}>
          <Field
            name="message"
            component="input"
            type="text"
            placeholder="Сообщение..."
            autoComplete="nope"
            className={styles.input}
          />
        </div>
        <div>
          <button type="submit" disabled={submitting || pristine} className={styles.send}>
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
}

InputBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default enhance(InputBox);
