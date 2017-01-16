import React from 'react';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { auth } from 'vclub/redux/club/auth';
import AuthInputField from './AuthInputField';

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


const enhance = compose(
  setPropTypes({
    dispatch: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    onSubmit: (props) => (data) => {
      const { dispatch } = props;
      const { username, master, remember } = data;

      dispatch(auth({ name: username, master }, remember));
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

export const AuthPageComponent = (props) => {
  const { handleSubmit } = props;

  return (
    <div className={styles.authWrapper}>
      <div className={styles.centerContent}>
        <header className={styles.logo}>Virtual Club</header>
        <main className={styles.form}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <fieldset className={styles.form_group}>
              <Field
                name="username"
                component={AuthInputField}
                type="text"
                placeholder="Имя..."
                className={styles.input_name}
                onFocus
              />
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
                className={styles.btnSubmit}
                type="submit"
              >
                Войти
              </button>
              <ul className={styles.social}>
                <li className={styles.socialButton}>
                  <a role="button" className={styles.vkontakte}>
                    Vk
                  </a>
                </li>
                <li className={styles.socialButton}>
                  <a role="button" className={styles.vkontakte}>
                    Fb
                  </a>
                </li>
                <li className={styles.socialButton}>
                  <a role="button" className={styles.vkontakte}>
                    <img src='./img/vk-w.png'/>
                  </a>
                </li>
              </ul>
            </fieldset>
          </form>
        </main>
      </div>
    </div>
  );
};

AuthPageComponent.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
};

export default enhance(AuthPageComponent);
