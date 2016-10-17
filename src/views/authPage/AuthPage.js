import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { auth, restoreAuth } from 'vclub/redux/club/auth';

import { connect } from 'react-redux';

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

const AuthPage = (props) => {
  const {handleSubmit} = props;
  const onSubmit = (data) => {
    const { dispatch } = props;
    const action = auth({ username, master }, remember);
    dispatch(action);
  };
  const renderUsernameField = ({ input, type, meta: { touched, error } }) => (
    <div>
      <div>
        <input
          {...input}
          placeholder="Имя..."
          type={type}
          className={styles.input_name}
          autoFocus
        />
        {touched
        && error
        && <span className={styles.errors}>{error}</span>}
      </div>
    </div>
  );
  return (
    <section className={styles.auth}>
      <form
        className={styles.login}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={styles.form_group}>
          <div>
            <div>
              <Field
                name="username"
                component={renderUsernameField}
                type="text"
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

const Initialize = reduxForm({
  form: 'auth',
  initialValues: {
    username: '',
    master: false,
    remember: true,
  },
  validate,
})(AuthPage);

export default connect(
  state => ({ state })
)(Initialize);


