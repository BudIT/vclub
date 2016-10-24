import React from 'react';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { auth } from 'vclub/redux/club/auth';

import styles from './AuthPage.css';


const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Пожалуйста, введите Ваше имя !!!';
  } else if (values.username.length > 15) {
    errors.username = 'Имя должно быть 15 символов или меньше';
  }

  return errors;
};

// eslint-disable-next-line react/prop-types
const AuthInputField = ({ input, type, placeholder, className, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={className}
        autoFocus
      />
      {touched
      && error
      && <span className={styles.errors}>{error}</span>}
    </div>
  </div>
);

const enhance = compose(
  setPropTypes({
    dispatch: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    onSubmit: (props) => (data) => {
      const { dispatch } = props;
      const { username, master, remember } = data;

      dispatch(auth({ username, master }, remember));
    },
  }),
  reduxForm({
    form: 'auth',
    initialValues: {
      username: '',
      master: false,
      remember: true,
    },
    validate,
  }),
);

const AuthPage = (props) => {
  const { handleSubmit } = props;

  return (
    <section className={styles.auth}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <fieldset className={styles.form_group}>
          <div>
            <div>
              <Field
                name="username"
                component={AuthInputField}
                type="text"
                placeholder="Имя..."
                className={styles.input_name}
                onFocus
              />
            </div>
          </div>
          <div className={styles.check_container}>
            <div className={styles.round_checkbox}>
              <Field
                name="master"
                id="master"
                component="input"
                type="checkbox"
              />
              <label htmlFor="master">
                <h3 className={styles.label_h3}>Ведущий</h3>
              </label>
            </div>
            <div className={styles.round_checkbox}>
              <Field
                name="remember"
                id="remember"
                component="input"
                type="checkbox"
              />
              <label htmlFor="remember">
                <h3 className={styles.label_h3}>Запомнить</h3>
              </label>
            </div>
          </div>
          <button
            className={styles.btn}
            type="submit"
          >
            Войти
          </button>
        </fieldset>
      </form>
    </section>
  );
};

AuthPage.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
};

export default enhance(AuthPage);
